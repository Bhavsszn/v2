import React from 'react';
import { ArrowLeft, Search, UserCheck, Calendar, Star, CreditCard, Shield } from 'lucide-react';

interface HowItWorksScreenProps {
  onBack: () => void;
}

export const HowItWorksScreen: React.FC<HowItWorksScreenProps> = ({ onBack }) => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How DJFNDR Works</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Finding the perfect DJ for your event has never been easier. 
            Here's how our platform connects you with professional DJs in your area.
          </p>
        </div>

        {/* For Clients Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">For Event Organizers</h2>
            <p className="text-lg text-gray-600">Book professional DJs in just a few simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Search & Browse</h3>
              <p className="text-gray-600">
                Enter your location and event date to find available DJs in your area. 
                Browse profiles, read reviews, and listen to sample mixes.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Book Your DJ</h3>
              <p className="text-gray-600">
                Found the perfect DJ? Send them a booking request with your event details. 
                They'll respond quickly with availability and pricing.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Enjoy Your Event</h3>
              <p className="text-gray-600">
                Your DJ will arrive on time with professional equipment. 
                After your event, leave a review to help other clients.
              </p>
            </div>
          </div>
        </div>

        {/* For DJs Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">For DJs</h2>
            <p className="text-lg text-gray-600">Grow your business and get more gigs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up and create a professional profile showcasing your experience, 
                specialties, and sample mixes. Upload photos and set your rates.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Receive Bookings</h3>
              <p className="text-gray-600">
                Get notified when clients in your area are looking for DJs. 
                Respond to booking requests and manage your calendar.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Get Paid</h3>
              <p className="text-gray-600">
                Secure payment processing ensures you get paid on time. 
                Build your reputation with client reviews and grow your business.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose DJFNDR?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <Shield className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Verified DJs</h3>
              <p className="text-sm text-gray-600">All DJs are verified professionals with proven experience</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <Star className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Real Reviews</h3>
              <p className="text-sm text-gray-600">Authentic reviews from verified bookings and events</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <CreditCard className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-sm text-gray-600">Safe and secure payment processing for all transactions</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <Calendar className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Easy Booking</h3>
              <p className="text-sm text-gray-600">Simple booking process with instant communication</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-2">How much does it cost to book a DJ?</h3>
              <p className="text-gray-600">
                DJ rates vary based on experience, location, and event type. Most DJs charge between $100-300 per hour. 
                You can see each DJ's rates on their profile before booking.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-2">How far in advance should I book?</h3>
              <p className="text-gray-600">
                We recommend booking at least 2-4 weeks in advance, especially for popular dates like weekends 
                and holidays. However, many DJs can accommodate last-minute bookings.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-2">What equipment do DJs provide?</h3>
              <p className="text-gray-600">
                Most professional DJs provide their own sound system, microphones, and lighting. 
                Equipment details are listed on each DJ's profile, and you can discuss specific needs when booking.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-2">Can I request specific songs?</h3>
              <p className="text-gray-600">
                Absolutely! Most DJs are happy to take song requests and can work with you to create the perfect 
                playlist for your event. Discuss your music preferences when making your booking.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-2">What if I need to cancel or reschedule?</h3>
              <p className="text-gray-600">
                Cancellation policies vary by DJ. Most offer flexible rescheduling options, especially with advance notice. 
                Check the specific terms when booking and communicate with your DJ as early as possible.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-red-500 to-purple-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect DJ?</h2>
          <p className="text-xl mb-6">Join thousands of satisfied clients who found their ideal DJ through DJFNDR</p>
          <button
            onClick={onBack}
            className="bg-white text-red-500 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Start Your Search
          </button>
        </div>
      </div>
    </div>
  );
};