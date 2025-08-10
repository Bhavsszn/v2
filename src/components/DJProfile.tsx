import React from 'react';
import { ArrowLeft, Star, Phone, Mail, Facebook, Share2, Copy, Check } from 'lucide-react';
import { DJ, Review } from '../types';

interface DJProfileProps {
  dj: DJ;
  reviews: Review[];
  isSharedView?: boolean;
  onBack: () => void;
  onBook: (dj: DJ) => void;
}

export const DJProfile: React.FC<DJProfileProps> = ({
  dj,
  reviews,
  isSharedView = false,
  onBack,
  onBook
}) => {
  const [copied, setCopied] = React.useState(false);
  const [selectedEventType, setSelectedEventType] = React.useState<string>('');
  
  const shareUrl = `${window.location.origin}/dj/${dj.id}`;
  
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const getEventTypePrice = (eventType: string) => {
    if (!dj.pricing) return dj.priceRange;
    const normalizedType = eventType.toLowerCase().replace(/\s+/g, '-');
    return dj.pricing[normalizedType] || dj.priceRange;
  };
  
  const eventTypes = dj.eventTypes.map(type => ({
    name: type,
    price: getEventTypePrice(type)
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {isSharedView ? 'Back to Home' : 'Back to Results'}
        </button>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-red-500 to-purple-600">
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <img
              src={dj.avatar}
              alt={dj.name}
              className="absolute bottom-4 left-6 w-24 h-24 rounded-full border-4 border-white object-cover"
            />
          </div>

          <div className="p-6 pt-16">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{dj.name}</h1>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">{dj.rating}</span>
                    <span className="ml-1 text-gray-500">({dj.reviewCount} reviews)</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-600">{dj.location}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  {dj.contact?.email && (
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      <span>{dj.contact.email}</span>
                    </div>
                  )}
                  {dj.contact?.phone && (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      <span>{dj.contact.phone}</span>
                    </div>
                  )}
                  {dj.contact?.facebook && (
                    <div className="flex items-center">
                      <Facebook className="w-4 h-4 mr-1" />
                      <span>Facebook</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </>
                  )}
                </button>
                <button 
                  onClick={() => onBook(dj)}
                  className="bg-red-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-red-600 transition-colors"
                >
                  BOOK NOW
                </button>
              </div>
            </div>

            {/* Bio Section */}
            {dj.bio && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">About {dj.name}</h2>
                <p className="text-gray-700 leading-relaxed">{dj.bio}</p>
              </div>
            )}

            {/* Event Types & Pricing */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Event Types & Pricing</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {eventTypes.map((event, index) => (
                  <div 
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-red-300 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">{event.name}</h3>
                    <p className="text-red-600 font-bold text-lg">{event.price}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Reviews</h2>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              {review.clientName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-900">
                              {review.clientName}
                            </p>
                            <p className="text-xs text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Book This DJ</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Type
                      </label>
                      <select 
                        value={selectedEventType}
                        onChange={(e) => setSelectedEventType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">Select event type</option>
                        {eventTypes.map((event, index) => (
                          <option key={index} value={event.name}>
                            {event.name} - {event.price}
                          </option>
                        ))}
                      </select>
                    </div>
                    {selectedEventType && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-sm text-red-700">
                          <strong>Price for {selectedEventType}:</strong> {getEventTypePrice(selectedEventType)}
                        </p>
                      </div>
                    )}
                    <button
                      onClick={() => onBook(dj)}
                      className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-red-600 transition-colors"
                    >
                      BOOK NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};