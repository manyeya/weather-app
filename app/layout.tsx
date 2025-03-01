import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "../lib/context/providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Weather App | Real-time Weather Forecast",
  description: "Get accurate real-time weather forecasts and conditions for locations worldwide. Stay informed with our comprehensive weather application.",
  keywords: "weather, forecast, temperature, weather app, real-time weather, weather conditions, weather forecast",
  authors: [{ name: 'Weather App' }],
  openGraph: {
    title: 'Weather App | Real-time Weather Forecast',
    description: 'Get accurate real-time weather forecasts and conditions for locations worldwide',
    type: 'website',
    siteName: 'Weather App',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weather App | Real-time Weather Forecast',
    description: 'Get accurate real-time weather forecasts and conditions for locations worldwide',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
