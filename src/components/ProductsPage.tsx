import React, { useState, useEffect } from 'react';
import { Music, Download, Zap, ArrowLeft, CreditCard } from 'lucide-react';
import { stripeProducts, getProductByPriceId } from '../stripe-config';
import { useStripe } from '../hooks/useStripe';
import { useAuth } from '../hooks/useAuth';

interface ProductsPageProps {
  onBack: () => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onBack }) => {
  const { user } = useAuth();
  const { loading, error, createCheckoutSession, getUserSubscription, getUserOrders } = useStripe();
  const [subscription, setSubscription] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const [subData, ordersData] = await Promise.all([
            getUserSubscription(),
            getUserOrders()
          ]);
          setSubscription(subData);
          setOrders(ordersData);
        } catch (err) {
          console.error('Error fetching user data:', err);
        }
      }
      setLoadingData(false);
    };

    fetchUserData();
  }, [user]);

  const handlePurchase = async (priceId: string, mode: 'payment' | 'subscription' = 'payment') => {
    if (!user) {
      alert('Please sign in to make a purchase');
      return;
    }

    try {
      await createCheckoutSession(priceId, mode);
    } catch (err) {
      console.error('Purchase error:', err);
    }
  };

  const getSubscriptionPlanName = () => {
    if (!subscription || !subscription.price_id) return null;
    const product = getProductByPriceId(subscription.price_id);
    return product?.name || 'Unknown Plan';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Music className="h-12 w-12 text-red-500" />
            <h1 className="text-4xl font-bold text-gray-900">DJFNDR</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Professional Audio Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get your tracks professionally mixed and mastered by industry experts
          </p>
        </div>

        {/* User Subscription Status */}
        {user && !loadingData && subscription && subscription.subscription_status === 'active' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <p className="text-green-700 font-medium">
                Active Plan: {getSubscriptionPlanName()}
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {stripeProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {product.name.includes('Mix') ? (
                      <Zap className="w-8 h-8 text-purple-500" />
                    ) : (
                      <Download className="w-8 h-8 text-blue-500" />
                    )}
                    <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                  </div>
                  {product.price && (
                    <div className="text-right">
                      <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 mb-6">{product.description}</p>

                <div className="space-y-3 mb-6">
                  {product.name.includes('Mix') ? (
                    <>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        Professional mixing and mastering
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        High-quality audio download
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        Industry-standard processing
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        Professional mastering only
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        Complete audio download
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        Quick turnaround time
                      </div>
                    </>
                  )}
                </div>

                <button
                  onClick={() => handlePurchase(product.priceId, product.mode)}
                  disabled={loading || !user}
                  className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>{loading ? 'Processing...' : `Purchase ${product.name}`}</span>
                </button>

                {!user && (
                  <p className="text-sm text-gray-500 text-center mt-3">
                    Please sign in to purchase
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        {user && orders.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {orders.slice(0, 5).map((order) => {
                const product = getProductByPriceId(order.price_id);
                return (
                  <div key={order.order_id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">
                        {product?.name || 'Unknown Product'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.order_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        ${(order.amount_total / 100).toFixed(2)}
                      </p>
                      <p className="text-sm text-green-600 capitalize">
                        {order.order_status}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Services?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <Music className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Professional Quality</h3>
              <p className="text-sm text-gray-600">Industry-standard mixing and mastering by experienced engineers</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Fast Turnaround</h3>
              <p className="text-sm text-gray-600">Quick processing times to get your music ready for release</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <Download className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">High-Quality Downloads</h3>
              <p className="text-sm text-gray-600">Receive your finished tracks in multiple high-quality formats</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};