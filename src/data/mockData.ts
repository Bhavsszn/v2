import { DJ, Review } from '../types';

export const mockDJs: DJ[] = [
  {
    id: '1',
    name: 'DJ Air',
    avatar: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    reviewCount: 127,
    eventTypes: ['Wedding', 'Corporate', 'Private Party'],
    location: 'Des Moines, IA',
    availability: 'AVAILABLE',
    bio: 'Professional DJ with over 8 years of experience specializing in weddings and corporate events. Known for reading the crowd and keeping the dance floor packed all night long.',
    contact: {
      email: 'djair@example.com',
      phone: '(515) 555-0123',
      facebook: 'https://facebook.com/djair'
    },
    priceRange: '$150-200/hr',
    pricing: {
      wedding: '$200/hr',
      corporate: '$175/hr',
      'private-party': '$150/hr',
      birthday: '$150/hr',
      club: '$250/hr',
      festival: '$300/hr'
    },
    pricingIds: {
      wedding: 'price_djair_wedding',
      corporate: 'price_djair_corporate',
      'private-party': 'price_djair_private_party',
      birthday: 'price_djair_birthday',
      club: 'price_djair_club',
      festival: 'price_djair_festival'
    }
  },
  {
    id: '2',
    name: 'DJ Taylor G',
    avatar: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    reviewCount: 89,
    eventTypes: ['Club', 'Festival', 'Private Party'],
    location: 'Des Moines, IA',
    availability: 'AVAILABLE',
    bio: 'High-energy DJ specializing in electronic dance music and club events. Bringing the latest tracks and an unforgettable experience to every performance.',
    contact: {
      email: 'taylorg@example.com',
      phone: '(515) 555-0456'
    },
    priceRange: '$200-300/hr',
    pricing: {
      club: '$300/hr',
      festival: '$350/hr',
      'private-party': '$250/hr',
      birthday: '$200/hr',
      corporate: '$275/hr',
      wedding: '$250/hr'
    },
    pricingIds: {
      club: 'price_tg_club',
      festival: 'price_tg_festival',
      'private-party': 'price_tg_private_party',
      birthday: 'price_tg_birthday',
      corporate: 'price_tg_corporate',
      wedding: 'price_tg_wedding'
    }
  },
  {
    id: '3',
    name: 'DJ Henny',
    avatar: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    reviewCount: 156,
    eventTypes: ['Wedding', 'Birthday', 'Anniversary'],
    location: 'Des Moines, IA',
    availability: 'BUSY',
    bio: 'Versatile DJ with a passion for creating memorable moments. Specializing in weddings and family celebrations with a perfect mix of classics and contemporary hits.',
    contact: {
      email: 'djhenny@example.com',
      phone: '(515) 555-0789'
    },
    priceRange: '$100-150/hr',
    pricing: {
      wedding: '$150/hr',
      birthday: '$125/hr',
      anniversary: '$140/hr',
      'private-party': '$130/hr',
      corporate: '$160/hr',
      club: '$180/hr'
    },
    pricingIds: {
      wedding: 'price_henny_wedding',
      birthday: 'price_henny_birthday',
      anniversary: 'price_henny_anniversary',
      'private-party': 'price_henny_private_party',
      corporate: 'price_henny_corporate',
      club: 'price_henny_club'
    }
  },
  {
    id: '4',
    name: 'DJ Storm',
    avatar: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    reviewCount: 203,
    eventTypes: ['Corporate', 'Wedding', 'Club'],
    location: 'Omaha, NE',
    availability: 'AVAILABLE',
    bio: 'Professional DJ with 10+ years experience in corporate events and weddings. Expert in crowd engagement and seamless event flow.',
    contact: {
      email: 'djstorm@example.com',
      phone: '(402) 555-0123'
    },
    priceRange: '$175-225/hr',
    pricing: {
      corporate: '$225/hr',
      wedding: '$200/hr',
      club: '$250/hr',
      'private-party': '$175/hr',
      birthday: '$175/hr',
      festival: '$275/hr'
    },
    pricingIds: {
      corporate: 'price_storm_corporate',
      wedding: 'price_storm_wedding',
      club: 'price_storm_club',
      'private-party': 'price_storm_private_party',
      birthday: 'price_storm_birthday',
      festival: 'price_storm_festival'
    }
  },
  {
    id: '5',
    name: 'DJ Luna',
    avatar: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    reviewCount: 94,
    eventTypes: ['Wedding', 'Private Party', 'Birthday'],
    location: 'Lincoln, NE',
    availability: 'AVAILABLE',
    bio: 'Elegant and sophisticated DJ perfect for upscale events. Specializing in creating the perfect ambiance for weddings and intimate gatherings.',
    contact: {
      email: 'djluna@example.com',
      phone: '(402) 555-0456'
    },
    priceRange: '$125-175/hr',
    pricing: {
      wedding: '$175/hr',
      'private-party': '$150/hr',
      birthday: '$140/hr',
      anniversary: '$160/hr',
      corporate: '$170/hr',
      club: '$180/hr'
    },
    pricingIds: {
      wedding: 'price_luna_wedding',
      'private-party': 'price_luna_private_party',
      birthday: 'price_luna_birthday',
      anniversary: 'price_luna_anniversary',
      corporate: 'price_luna_corporate',
      club: 'price_luna_club'
    }
  },
  {
    id: '6',
    name: 'DJ Blaze',
    avatar: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    reviewCount: 78,
    eventTypes: ['Club', 'Festival', 'Corporate'],
    location: 'Omaha, NE',
    availability: 'AVAILABLE',
    bio: 'High-energy performer bringing the heat to every event. Known for explosive sets and keeping the energy at maximum all night long.',
    contact: {
      email: 'djblaze@example.com',
      phone: '(402) 555-0789'
    },
    priceRange: '$200-250/hr',
    pricing: {
      club: '$250/hr',
      festival: '$300/hr',
      corporate: '$225/hr',
      'private-party': '$200/hr',
      birthday: '$200/hr',
      wedding: '$225/hr'
    },
    pricingIds: {
      club: 'price_blaze_club',
      festival: 'price_blaze_festival',
      corporate: 'price_blaze_corporate',
      'private-party': 'price_blaze_private_party',
      birthday: 'price_blaze_birthday',
      wedding: 'price_blaze_wedding'
    }
  }
];

export const mockReviews: Review[] = [
  // ...unchanged review objects...
];
