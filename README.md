# Weather App

A modern weather application built with Next.js that provides current weather conditions and forecasts.

## Features

- Real-time weather data display
- Location-based weather information
- Multi-day weather forecasts
- Search functionality for different locations
- Persistent storage for recent searches
- Responsive design with Tailwind CSS
- Units toggle (Metric/Imperial)
- Favorites system to save and quickly access preferred cities
- Interactive hourly temperature chart with adjustable time ranges (6h/12h/24h)
- Glassmorphic UI with elegant animations and transitions
- Dynamic weather icon display based on current conditions

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Font**: Geist (optimized with next/font)
- **Charts**: Recharts for interactive data visualization
- **UI Components**: Custom glassmorphic components

## Project Structure

```
weather-app/
├── app/                    # Next.js app directory
│   ├── components/         # React components
│   ├── fonts/             # Font files
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   └── ui/               # Shared UI elements
├── lib/                   # Application logic
│   ├── context/          # React context providers
│   └── services/         # Core services
│       ├── location/     # Location services
│       ├── storage/      # Local storage utilities
│       └── weather/      # Weather API integration
```

## Prerequisites

Before running this project, make sure you have:
- Node.js 18+ installed
- A `.env.local` file with required environment variables:
  ```
  NEXT_PUBLIC_WEATHER_API_KEY=your_api_key
  ```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page auto-updates as you edit the files. The main application logic is in `app/page.tsx`.

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/en-US/)
