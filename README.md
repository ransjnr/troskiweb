# Troski - Ride-sharing Platform

Troski is a proudly Canadian ride-sharing platform inspired by the Ghanaian term for shared mini-bus transportation. It is designed to offer affordable, reliable, and community-focused mobility services across Canada.

## Features

- **Real-time ride booking** with live GPS tracking
- **Bilingual support** (English and French)
- **Secure, cashless payment system** (cards and digital wallets)
- **Transparent, no-surge pricing**
- **Loyalty rewards** for frequent riders
- **Two-way rating system** for both drivers and riders

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Convex (database and backend)
- **Authentication**: Clerk
- **Payments**: Stripe
- **Maps & Location**: Google Maps API
- **Deployment**: Vercel (frontend), Convex Cloud (backend)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Convex account
- Clerk account
- Stripe account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/troskiweb.git
cd troskiweb
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   
Create a `.env.local` file in the root directory and add the following:

```
NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

4. Run the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
troskiweb/
├── convex/          # Convex backend functions & schema
├── public/          # Static assets
├── src/
│   ├── app/         # Next.js app router
│   ├── components/  # Reusable UI components
│   ├── hooks/       # Custom React hooks
│   ├── lib/         # Utility functions
│   └── types/       # TypeScript type definitions
├── .env.local       # Environment variables (not in repo)
└── README.md        # This file
```

## Pricing Model

- **Base Fare**: CAD $3.00
- **Distance Fee**: CAD $0.75/km
- **Time Fee**: CAD $0.20/min
- **No surge pricing**

Example Fare – 30 km, 22 min:
- Base: $3.00
- Distance: 30 × $0.75 = $22.50
- Time: 22 × $0.20 = $4.40
- Total Fare: CAD $29.90

## License

[MIT License](LICENSE)

## Acknowledgements

This project is a demonstration of a ride-sharing application similar to services like Uber and Lyft, but with a focus on community, affordability, and transparency.
