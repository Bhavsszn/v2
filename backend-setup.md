# Backend Setup Guide for DJFNDR

This guide outlines how to set up a backend API to replace the mock data in your DJFNDR application.

## Technology Stack Recommendations

### Option 1: Node.js + Express + PostgreSQL
```bash
# Initialize backend project
mkdir djfndr-backend
cd djfndr-backend
npm init -y

# Install dependencies
npm install express cors helmet morgan dotenv bcryptjs jsonwebtoken
npm install pg sequelize sequelize-cli
npm install --save-dev nodemon @types/node typescript ts-node
```

### Option 2: Supabase (Recommended for MVP)
Supabase provides a complete backend-as-a-service with:
- PostgreSQL database
- Authentication
- Real-time subscriptions
- File storage
- Auto-generated APIs

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('client', 'dj', 'admin')),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### DJs Table
```sql
CREATE TABLE djs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  bio TEXT,
  location VARCHAR(255) NOT NULL,
  event_types TEXT[] NOT NULL,
  price_range VARCHAR(50),
  availability_status VARCHAR(20) DEFAULT 'available',
  facebook_url TEXT,
  instagram_url TEXT,
  website_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Reviews Table
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dj_id UUID REFERENCES djs(id) ON DELETE CASCADE,
  client_id UUID REFERENCES users(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Bookings Table
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES users(id) ON DELETE CASCADE,
  dj_id UUID REFERENCES djs(id) ON DELETE CASCADE,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  event_type VARCHAR(50) NOT NULL,
  venue VARCHAR(255) NOT NULL,
  guest_count INTEGER,
  budget_range VARCHAR(50),
  special_requests TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### DJs
- `GET /api/djs` - Get all DJs
- `POST /api/djs/search` - Search DJs by filters
- `GET /api/djs/:id` - Get DJ by ID
- `PUT /api/djs/:id` - Update DJ profile (DJ only)
- `GET /api/djs/:id/reviews` - Get DJ reviews

### Bookings
- `POST /api/bookings` - Create booking request
- `GET /api/bookings/user/:userId` - Get user bookings
- `PUT /api/bookings/:id` - Update booking status
- `DELETE /api/bookings/:id` - Cancel booking

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/dj/:djId` - Get reviews for DJ
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

## Implementation Steps

1. **Set up database** (PostgreSQL or Supabase)
2. **Create API endpoints** using Express.js or Supabase functions
3. **Implement authentication** with JWT or Supabase Auth
4. **Add data validation** using libraries like Joi or Yup
5. **Set up file uploads** for DJ photos and audio samples
6. **Implement search functionality** with location-based filtering
7. **Add email notifications** for booking requests
8. **Set up payment processing** with Stripe (future feature)

## Environment Variables

Copy `.env.example` to `.env` and fill in your configuration values.

## Deployment Options

- **Heroku** - Easy deployment for Node.js apps
- **Vercel** - Great for serverless functions
- **AWS** - Full control and scalability
- **Supabase** - Managed backend service
- **Railway** - Modern deployment platform

## Next Steps

1. Choose your backend technology stack
2. Set up the database schema
3. Implement the API endpoints
4. Update the frontend to use real API calls
5. Add authentication and user management
6. Implement file upload for DJ profiles
7. Add payment processing integration