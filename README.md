# DJFNDR

A professional DJ booking platform that connects clients with qualified DJs for events. Built with React, TypeScript, and Tailwind CSS.

## About DJFNDR

DJFNDR is a specialized booking platform designed to bridge the gap between clients seeking professional DJ services and experienced DJs looking for quality gigs. Unlike generic service platforms, DJFNDR focuses exclusively on the DJ booking process, providing a tailored experience that addresses the unique needs of both clients and DJs.

### Core Features

- **Location-Based Search**: Find DJs by geographic location and event date
- **Verified Reviews**: Authentic reviews from confirmed bookings
- **Comprehensive Profiles**: Detailed DJ profiles including specialties, experience, and contact information
- **Streamlined Booking**: Professional booking process with detailed event specifications
- **Responsive Design**: Optimized for desktop and mobile devices

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Code Quality**: ESLint with TypeScript configuration

## Getting Started

### Prerequisites

- Node.js version 18.0 or higher
- npm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/djfndr.git
cd djfndr
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Access the application at `http://localhost:5173`

## Project Architecture

```
src/
├── components/
│   ├── Header.tsx          # Application navigation
│   ├── WelcomeScreen.tsx   # Initial landing interface
│   ├── SearchScreen.tsx    # DJ search functionality
│   ├── SearchResults.tsx   # Search results display
│   ├── DJProfile.tsx       # Individual DJ profile pages
│   └── BookingModal.tsx    # Booking request interface
├── data/
│   └── mockData.ts         # Sample data for development
├── types/
│   └── index.ts            # TypeScript type definitions
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
└── index.css              # Global stylesheet
```

## User Experience Flow

### Client Journey
1. **Initial Search**: Users enter their location and event date
2. **DJ Discovery**: Browse available DJs with ratings, specialties, and availability
3. **Profile Review**: Examine detailed DJ profiles including verified reviews
4. **Booking Request**: Submit comprehensive booking requests with event details

### DJ Features (Planned)
- Professional profile management
- Availability calendar integration
- Booking request management
- Performance analytics dashboard

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run preview  # Preview production build
npm run lint     # Run ESLint code analysis
```

## Current Implementation Status

This repository contains the MVP (Minimum Viable Product) version of DJFNDR, focusing on core search, review, and booking functionality. The platform currently operates with mock data to demonstrate user flows and interface design.

### Implemented Features
- Complete user interface for DJ search and discovery
- Responsive design optimized for all device sizes
- Professional booking request system
- Review and rating display system
- Clean, modern user experience

### Planned Enhancements
- User authentication and role-based access
- Real-time messaging between clients and DJs
- Payment processing and escrow services
- Calendar integration and availability management
- Advanced search filters and AI-powered recommendations

## Contributing

This project follows professional development standards with TypeScript for type safety, ESLint for code quality, and a modular component architecture for maintainability.

## License

Copyright 2025 DJFNDR, LLC. All rights reserved.

## Contact

DJFNDR, LLC  
307 W 24th St.  
Kearney, NE 68845  
www.djfndr.com