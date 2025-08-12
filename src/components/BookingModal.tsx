// src/components/BookingModal.tsx
import React from 'react';
import { X, Calendar, MapPin, Clock } from 'lucide-react';
import { DJ } from '../types';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { supabase } from '../lib/supabase';

interface BookingModalProps {
  dj: DJ;
  isOpen: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm?: (details: any) => void; // optional: if you still store bookings
}

export const BookingModal: React.FC<BookingModalProps> = ({
  dj,
  isOpen,
  loading = false,
  onClose,
  onConfirm,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [submitting, setSubmitting] = React.useState(false);
  const [date, setDate] = React.useState<string>('');
  const [venue, setVenue] = React.useState<string>('');
  const [guests, setGuests] = React.useState<string>('40');
  const [budget, setBudget] = React.useState<string>('Under $500');
  const [notes, setNotes] = React.useState<string>('');

  const [selectedEventType, setSelectedEventType] = React.useState<string>(
    dj.eventTypes?.[0] ?? ''
  );

  const norm = (s: string) => s.toLowerCase().replace(/\s+/g, '-');

  const handlePayAndBook = async () => {
    if (!stripe || !elements) return; // Stripe.js not yet loaded

    const eventType = selectedEventType || dj.eventTypes?.[0] || '';
    const priceId = dj.pricingIds?.[norm(eventType)];

    if (!priceId) {
      alert('Payment is not configured for this event type yet.');
      return;
    }

    setSubmitting(true);
    try {
      // 1) Ask your Edge Function to create a PaymentIntent (amount pulled from Stripe Price)
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          price_id: priceId,
          metadata: {
            djId: dj.id,
            djName: dj.name,
            eventType,
            date,
            venue,
            guests,
            budget,
          },
        },
      });

      if (error || !data?.client_secret) {
        console.error('PI create error:', error);
        alert('Failed to start payment. Please try again.');
        return;
      }

      // 2) Confirm payment with card input
      const card = elements.getElement(CardElement);
      if (!card) {
        alert('Payment form not ready. Please try again.');
        return;
      }

      const result = await stripe.confirmCardPayment(data.client_secret, {
        payment_method: {
          card,
          billing_details: {
            // You can add a name/email field to your form if you want richer receipts
          },
        },
      });

      if (result.error) {
        console.error('confirmCardPayment error:', result.error);
        alert(result.error.message || 'Payment failed. Please try another card.');
        return;
      }

      if (result.paymentIntent?.status === 'succeeded') {
        // Optional: persist booking details in your DB
        onConfirm?.({
          djId: dj.id,
          eventType,
          date,
          venue,
          guests,
          budget,
          notes,
          paymentIntentId: result.paymentIntent.id,
        });

        // Redirect to success page (or close + show toast)
        window.location.href = '/success';
      }
    } catch (e: any) {
      console.error(e);
      alert(e?.message || 'Payment error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Book {dj.name}</h3>
          <button onClick={onClose} className="rounded p-1 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-4 px-6 py-5">
          {/* Event type */}
          <div>
            <label className="mb-1 block text-sm font-medium">Event Type</label>
            <select
              className="w-full rounded-lg border px-3 py-2"
              value={selectedEventType}
              onChange={(e) => setSelectedEventType(e.target.value)}
            >
              {dj.eventTypes?.map((et) => (
                <option key={et} value={et}>
                  {et} {dj.pricing?.[norm(et)] ? `- ${dj.pricing[norm(et)]}` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="mb-1 block text-sm font-medium">Date</label>
            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                className="w-full rounded-lg border px-9 py-2"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          {/* Venue */}
          <div>
            <label className="mb-1 block text-sm font-medium">Venue/Location</label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Venue/Location"
                className="w-full rounded-lg border px-9 py-2"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
            </div>
          </div>

          {/* Guests + Budget */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Expected Guest Count</label>
              <input
                type="number"
                className="w-full rounded-lg border px-3 py-2"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Budget Range</label>
              <select
                className="w-full rounded-lg border px-3 py-2"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option>Under $500</option>
                <option>$500 - $1,000</option>
                <option>$1,000 - $1,500</option>
                <option>$1,500 - $2,500</option>
                <option>$2,500+</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-1 block text-sm font-medium">Special Requests or Notes</label>
            <textarea
              className="h-24 w-full resize-none rounded-lg border px-3 py-2"
              placeholder="Any special requests, equipment needs, or other details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Card input */}
          <div>
            <label className="mb-1 block text-sm font-medium">Payment</label>
            <div className="rounded-lg border p-3">
              <CardElement options={{ hidePostalCode: true }} />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Your card details are securely handled by Stripe.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
          <button
            className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-50"
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            onClick={handlePayAndBook}
            disabled={!stripe || submitting || loading}
            className="rounded-lg bg-red-500 px-5 py-2 font-semibold text-white hover:bg-red-600 disabled:opacity-60"
          >
            {submitting ? 'Processing…' : 'Pay & Book DJ'}
          </button>
        </div>
      </div>
    </div>
  );
};
