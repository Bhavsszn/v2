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
    }
  },
  {
    id: '2',
    name: 'DJ Taylor G',
    avatar: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5.0,
    reviewCount: 104,
    eventTypes: ['WEDDINGS', 'CLUBS', 'PARTIES', 'PROMS', 'OTHER'],
    location: 'Des Moines, IA',
    availability: 'AVAILABLE'
  },
  {
    id: '3',
    name: 'DJ Henny',
    avatar: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5.0,
    reviewCount: 87,
    eventTypes: ['WEDDINGS', 'CLUBS', 'PARTIES', 'PROMS', 'OTHER'],
    location: 'Des Moines, IA',
    availability: 'AVAILABLE'
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