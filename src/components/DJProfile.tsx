import React from 'react';
import { ArrowLeft, Star, Phone, Mail, Facebook } from 'lucide-react';
import { DJ, Review } from '../types';

interface DJProfileProps {
  dj: DJ;
  reviews: Review[];
  onBack: () => void;
  onBook: (dj: DJ) => void;
}

export const DJProfile: React.FC<DJProfileProps> = ({
  dj,
  reviews,
  onBack,
  onBook
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Results
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

              <button className="bg-red-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-red-600 transition-colors">
                CONTACT
              </button>
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
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                        <option>Wedding</option>
                        <option>Corporate Event</option>
                        <option>Birthday Party</option>
                        <option>Club Event</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <button
                      onClick={() => onBook(dj)}
                      className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-red-600 transition-colors"
                    >
                      BOOK
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