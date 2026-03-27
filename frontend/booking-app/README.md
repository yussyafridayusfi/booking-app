# Booking App - Frontend

A modern Vue 3 + Vite frontend for room booking application.

## Features

- **Vue 3** - Latest Vue framework with Composition API
- **Vue Router** - Client-side routing for seamless navigation
- **Responsive Design** - Mobile-friendly interface
- **Authentication** - Login and registration system
- **Room Browsing** - Browse and search available rooms
- **Booking Management** - Create and manage room bookings
- **Modern UI** - Clean and intuitive user interface

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── components/        # Reusable Vue components
│   ├── Header.vue    # Navigation header
│   └── Footer.vue    # Footer component
├── pages/            # Page components
│   ├── Home.vue      # Landing page
│   ├── Login.vue     # Login page
│   ├── Register.vue  # Registration page
│   ├── Rooms.vue     # Browse rooms
│   ├── BookingDetails.vue  # Booking form
│   └── MyBookings.vue      # User bookings
├── router/           # Vue Router configuration
│   └── index.js      # Route definitions
├── services/         # API and business logic
│   ├── api.js        # HTTP client
│   ├── auth.js       # Authentication service
│   ├── booking.js    # Booking service
│   └── room.js       # Room service
├── assets/          # Static assets
│   └── styles/      # Global styles
├── App.vue          # Root component
└── main.js          # Application entry point
```

## Configuration

### API Integration

By default, the app connects to `http://localhost:3000/api`. To change this, set the `VITE_API_URL` environment variable:

```bash
VITE_API_URL=https://api.example.com npm run dev
```

## Available Routes

- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/rooms` - Browse available rooms
- `/booking/:roomId` - Book a specific room
- `/my-bookings` - View user bookings

## Technologies Used

- Vue 3
- Vue Router 4
- Vite
- ESLint
- CSS3

## License

ISC
