import React, { useState } from 'react';
import { ArrowLeft, Music, User, MapPin, Phone, Mail, Globe, Facebook, Instagram } from 'lucide-react';

interface DJSignupScreenProps {
  onBack: () => void;
}

export const DJSignupScreen: React.FC<DJSignupScreenProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // DJ Information
    djName: '',
    bio: '',
    location: '',
    experience: '',
    priceRange: '',
    
    // Event Types
    eventTypes: [] as string[],
    
    // Social Media
    website: '',
    facebook: '',
    instagram: '',
    
    // Equipment
    hasOwnEquipment: true,
    equipmentDescription: ''
  });

  const eventTypeOptions = [
    'Weddings',
    'Corporate Events',
    'Birthday Parties',
    'Club Events',
    'Proms',
    'Festivals',
    'Private Parties',
    'Other'
  ];

  const handleEventTypeChange = (eventType: string) => {
    setFormData(prev => ({
      ...prev,
      eventTypes: prev.eventTypes.includes(eventType)
        ? prev.eventTypes.filter(type => type !== eventType)
        : [...prev.eventTypes, eventType]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    alert('DJ signup submitted! We will review your application and get back to you soon.');
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-purple-600 px-6 py-8">
            <div className="flex items-center space-x-3 text-white">
              <Music className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Join DJFNDR</h1>
                <p className="text-red-100">Start getting more gigs today</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    DJ/Stage Name *
                  </label>
                  <input
                    type="text"
                    value={formData.djName}
                    onChange={(e) => setFormData({ ...formData, djName: e.target.value })}
                    placeholder="e.g., DJ Storm"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* DJ Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Music className="w-5 h-5 mr-2" />
                DJ Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location (City, State) *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Des Moines, IA"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio/Description *
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    placeholder="Tell clients about your style, experience, and what makes you unique..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience *
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select experience</option>
                      <option value="1-2">1-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range (per hour) *
                    </label>
                    <select
                      value={formData.priceRange}
                      onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select price range</option>
                      <option value="$50-100">$50-100/hr</option>
                      <option value="$100-150">$100-150/hr</option>
                      <option value="$150-200">$150-200/hr</option>
                      <option value="$200-300">$200-300/hr</option>
                      <option value="$300+">$300+/hr</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Types */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Event Types You Specialize In *
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {eventTypeOptions.map((eventType) => (
                  <label key={eventType} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.eventTypes.includes(eventType)}
                      onChange={() => handleEventTypeChange(eventType)}
                      className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">{eventType}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Social Media & Website */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Online Presence (Optional)
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-1" />
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://yourwebsite.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Facebook className="w-4 h-4 inline mr-1" />
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={formData.facebook}
                    onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                    placeholder="https://facebook.com/yourpage"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Instagram className="w-4 h-4 inline mr-1" />
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="https://instagram.com/yourhandle"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Equipment */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Equipment Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasOwnEquipment}
                      onChange={(e) => setFormData({ ...formData, hasOwnEquipment: e.target.checked })}
                      className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      I have my own professional DJ equipment
                    </span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Equipment Description (Optional)
                  </label>
                  <textarea
                    value={formData.equipmentDescription}
                    onChange={(e) => setFormData({ ...formData, equipmentDescription: e.target.value })}
                    rows={3}
                    placeholder="Describe your equipment setup (speakers, mixers, lighting, etc.)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-red-600 transition-colors"
              >
                Submit DJ Application
              </button>
              <p className="text-sm text-gray-600 text-center mt-4">
                By submitting this form, you agree to our Terms of Service and Privacy Policy.
                We'll review your application and contact you within 2-3 business days.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};