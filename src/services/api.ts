import { mockDJs, mockReviews } from '../data/mockData';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

class ApiService {
  private async mockResponse<T>(data: T, delay: number = 500): Promise<ApiResponse<T>> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, delay));
    
    return {
      data,
      success: true,
      message: 'Success'
    };
  }

  // DJ-related API calls
  async searchDJs(filters: {
    location: string;
    date: string;
    eventType?: string;
    priceRange?: string;
  }) {
    let filteredDJs = [...mockDJs];

    // Filter by location (case insensitive, more flexible matching)
    if (filters.location) {
      const searchLocation = filters.location.toLowerCase().trim();
      filteredDJs = filteredDJs.filter(dj => {
        const djLocation = dj.location.toLowerCase();
        // Match city, state, or zip code patterns
        return djLocation.includes(searchLocation) || 
               searchLocation.includes(djLocation.split(',')[0].trim()) ||
               /^\d{5}$/.test(searchLocation); // If it's a zip code, show all DJs
      }
      );
    }

    // Filter by event type
    if (filters.eventType) {
      filteredDJs = filteredDJs.filter(dj => 
        dj.specialties.some(specialty => 
          specialty.toLowerCase().includes(filters.eventType!.toLowerCase())
        )
      );
    }

    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filteredDJs = filteredDJs.filter(dj => {
        const price = parseInt(dj.hourlyRate.replace('$', '').replace('/hr', ''));
        return price >= min && price <= max;
      });
    }

    return this.mockResponse(filteredDJs);
  }

  async getDJById(id: string) {
    const dj = mockDJs.find(dj => dj.id === id);
    if (!dj) {
      throw new Error('DJ not found');
    }
    return this.mockResponse(dj);
  }

  async getDJReviews(djId: string) {
    const reviews = mockReviews.filter(review => review.djId === djId);
    return this.mockResponse(reviews);
  }

  // Booking-related API calls
  async createBooking(bookingData: any) {
    const booking = {
      id: Date.now().toString(),
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    return this.mockResponse(booking);
  }

  async getBookings(userId: string) {
    // Return empty array for mock implementation
    return this.mockResponse([]);
  }

  // Review-related API calls
  async createReview(reviewData: any) {
    const review = {
      id: Date.now().toString(),
      ...reviewData,
      createdAt: new Date().toISOString()
    };
    return this.mockResponse(review);
  }

  // User authentication
  async login(credentials: { email: string; password: string }) {
    const user = {
      id: '1',
      email: credentials.email,
      name: 'Demo User',
      token: 'mock-jwt-token'
    };
    return this.mockResponse(user);
  }

  async register(userData: any) {
    const user = {
      id: Date.now().toString(),
      ...userData,
      token: 'mock-jwt-token'
    };
    return this.mockResponse(user);
  }

  async logout() {
    return this.mockResponse({ message: 'Logged out successfully' });
  }
}

export const apiService = new ApiService();