import { DJ, Review } from '../types';

export const mockDJs: DJ[] = [
  {
    id: '1',
    name: 'DJ Air',
    avatar: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5.0,
    reviewCount: 126,
    eventTypes: ['WEDDINGS', 'CLUBS', 'PARTIES', 'PROMS', 'OTHER'],
    location: 'Des Moines, IA',
    availability: 'AVAILABLE',
    bio: 'Professional DJ with 10+ years of experience specializing in weddings and corporate events.',
    contact: {
      email: 'djair@example.com',
      phone: '402.555.1001',
      facebook: 'https://www.facebook.com/djair'
    },
    priceRange: '$150-200/hr'
  },
  {
    id: '2',
    name: 'DJ Taylor G',
    avatar: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5.0,
    reviewCount: 104,
    eventTypes: ['WEDDINGS', 'CLUBS', 'PARTIES', 'PROMS', 'OTHER'],
    location: 'Des Moines, IA',
    availability: 'AVAILABLE',
    bio: 'High-energy DJ specializing in club events and parties. Known for reading the crowd perfectly.',
    contact: {
      email: 'djtaylorg@example.com',
      phone: '515.555.2002'
    },
    priceRange: '$125-175/hr'
  },
  {
    id: '3',
    name: 'DJ Henny',
    avatar: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5.0,
    reviewCount: 87,
    eventTypes: ['WEDDINGS', 'CLUBS', 'PARTIES', 'PROMS', 'OTHER'],
    location: 'Des Moines, IA',
    availability: 'AVAILABLE',
    bio: 'Versatile DJ with expertise in multiple genres. Perfect for weddings and corporate events.',
    contact: {
      email: 'djhenny@example.com',
      phone: '515.555.3003'
    },
    priceRange: '$100-150/hr'
  },
  // Add more DJs for different locations
  {
    id: '4',
    name: 'DJ Mike Storm',
    avatar: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 4.8,
    reviewCount: 92,
    eventTypes: ['WEDDINGS', 'CORPORATE', 'PARTIES'],
    location: 'Omaha, NE',
    availability: 'AVAILABLE',
    bio: 'Professional wedding DJ with a passion for creating unforgettable moments.',
    contact: {
      email: 'djmikestorm@example.com',
      phone: '402.555.4004'
    },
    priceRange: '$175-225/hr'
  },
  {
    id: '5',
    name: 'DJ Luna',
    avatar: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 4.9,
    reviewCount: 156,
    eventTypes: ['CLUBS', 'PARTIES', 'FESTIVALS'],
    location: 'Lincoln, NE',
    availability: 'AVAILABLE',
    bio: 'Electronic music specialist with festival experience and cutting-edge equipment.',
    contact: {
      email: 'djluna@example.com',
      phone: '402.555.5005'
    },
    priceRange: '$200-300/hr'
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    djId: '1',
    clientName: 'The Loft - Kearney, NE',
    rating: 5,
    comment: 'Incredible Energy! First time having him here & cant wait to have him back!',
    date: '3 months ago',
    verified: true
  },
  {
    id: '2',
    djId: '1',
    clientName: 'Bar 30 - Omaha, NE',
    rating: 5,
    comment: 'Our Regular House DJ was NEVER disappoints. We have regulars who only come when he plays!',
    date: '3 months ago',
    verified: true
  },
  {
    id: '3',
    djId: '1',
    clientName: 'The Copper Cup - Des Moines, IA',
    rating: 5,
    comment: 'First time booking him so didnt know what to expect but would QUICKLY book again.',
    date: '2 months ago',
    verified: true
  }
];