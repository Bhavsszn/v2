import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, DollarSign } from 'lucide-react';
import { DJ } from '../types';
import { useStripe } from '../hooks/useStripe';
import { useAuth } from '../hooks/useAuth';

interface BookingModalProps {
  dj: DJ;
  isOpen: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: (bookingDetails: any) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  dj,
  isOpen,
  loading = false,
  onClose,
  onConfirm
}) => {
  const { user } = useAuth();
  const { createCheckoutSession, loading: stripeLoading } = useStripe();
  const [formData, setFormData] = useState({
    eventDate: '',
    eventTime: '',
    eventType: 'wedding',
    venue: '',
    guestCount: '',
    budget: '',
    specialRequests: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please sign in to book a DJ');
      return;
    }

    if (!formData.eventType) {
      alert('Please select an event type');
      return;
    }

    // Get the Stripe price ID for the selected event type
    const normalizedEventType = formData.eventType.toLowerCase().replace(/\s+/g, '-');
    const priceId = dj.pricingIds?.[normalizedEventType];

    if (!priceId) {
      alert('Pricing not available for this event type. Please contact the DJ directly.');
      return;
    }

    try {
      // Create Stripe checkout session
      await createCheckoutSession(priceId, 'payment');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout process. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Book {dj.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Event Date
              </label>
              <input
                type="date"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Event Time
              </label>
              <input
                type="time"
                value={formData.eventTime}
                onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Type
            </label>
            <select
              value={formData.eventType}
              onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Select event type</option>
              {dj.eventTypes.map((eventType) => {
                const normalizedType = eventType.toLowerCase().replace(/\s+/g, '-');
                const price = dj.pricing?.[normalizedType] || dj.priceRange;
                return (
                  <option key={eventType} value={eventType}>
                    {eventType} - {price}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Venue/Location
            </label>
            <input
              type="text"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              placeholder="Enter venue name or address"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Guest Count
              </label>
              <input
                type="number"
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                placeholder="e.g., 150"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Budget Range
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Select budget range</option>
                <option value="under-500">Under $500</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="1000-2000">$1,000 - $2,000</option>
                <option value="2000-5000">$2,000 - $5,000</option>
                <option value="over-5000">Over $5,000</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requests or Notes
            </label>
            <textarea
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              rows={4}
              placeholder="Any special music requests, equipment needs, or other details..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || stripeLoading || !formData.eventType}
              className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
            >
              {loading || stripeLoading ? 'Processing...' : 'Pay & Book DJ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};