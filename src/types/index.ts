export interface DJ {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  eventTypes: string[];
  location: string;
  availability: 'AVAILABLE' | 'BUSY' | 'UNAVAILABLE';
  bio?: string;
  contact?: {
    email: string;
    phone: string;
    facebook?: string;
  };
  priceRange?: string;
}

export interface Review {
  id: string;
  djId: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface SearchFilters {
  location: string;
  date: string;
  eventType?: string;
  priceRange?: string;
}

export type UserRole = 'client' | 'dj' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}