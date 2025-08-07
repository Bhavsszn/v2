import React, { useEffect, useState } from 'react';
import { CheckCircle, Download, Music, ArrowLeft } from 'lucide-react';
import { getProductByPriceId } from '../stripe-config';

interface SuccessPageProps {
  onBack: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ onBack }) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [productInfo, setProductInfo] = useState<any>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionIdParam = urlParams.get('session_id');
    
    if (sessionIdParam) {
      setSessionId(sessionIdParam);
      // In a real app, you'd fetch the session details from your backend
      // For now, we'll show a generic success message
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been processed successfully.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Music className="w-6 h-6 text-red-500" />
            <h3 className="font-semibold text-gray-900">What's Next?</h3>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>You'll receive download instructions via email</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Processing typically takes 24-48 hours</span>
            </div>
          </div>
        </div>

        {sessionId && (
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-700">
              <strong>Order ID:</strong> {sessionId.slice(-8).toUpperCase()}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={onBack}
            className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          
          <p className="text-sm text-gray-500">
            Questions? Contact us at support@djfndr.com
          </p>
        </div>
      </div>
    </div>
  );
};