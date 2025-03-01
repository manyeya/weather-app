'use client';

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto">
        {/* Header Section Skeleton */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-full max-w-2xl flex justify-between items-center">
            <Skeleton className="h-14 w-64 rounded-2xl" /> {/* Search Bar */}
            <Skeleton className="h-14 w-32 rounded-2xl" /> {/* Units Toggle */}
          </div>
        </div>

        <div className="space-y-4 flex flex-col w-full">
          {/* Weather and Favorites Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Weather Card Skeleton */}
            <div className="h-full">
              <div className="relative backdrop-blur-glassmorphic bg-glass-gradient border border-glass-border rounded-2xl p-4 w-full h-full">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-48" /> {/* City Name */}
                    <Skeleton className="h-12 w-24" /> {/* Temperature */}
                  </div>
                  <Skeleton className="h-6 w-6 rounded-full" /> {/* Favorite Star */}
                </div>
                
                <div className="mt-3 flex items-center">
                  <Skeleton className="h-16 w-16 rounded-full" /> {/* Weather Icon */}
                  <Skeleton className="h-5 w-32 ml-2" /> {/* Weather Description */}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-1">
                      <Skeleton className="h-3 w-16" /> {/* Label */}
                      <Skeleton className="h-5 w-20" /> {/* Value */}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Favorites Card Skeleton */}
            <div className="h-full">
              <div className="relative backdrop-blur-glassmorphic bg-glass-gradient border border-glass-border rounded-2xl p-4 w-full h-full">
                <Skeleton className="h-6 w-32 mb-3" /> {/* Title */}
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full rounded-lg" /> /* Favorite City Items */
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 5-Day Forecast Skeleton */}
          <div className="relative backdrop-blur-glassmorphic bg-glass-gradient border border-glass-border rounded-2xl p-4 w-full">
            <Skeleton className="h-6 w-32 mb-3" /> {/* Title */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col items-center p-2 rounded-xl border border-glass-border bg-white/5">
                  <Skeleton className="h-4 w-16 mb-2" /> {/* Day */}
                  <Skeleton className="h-12 w-12 rounded-full mb-2" /> {/* Weather Icon */}
                  <Skeleton className="h-6 w-12 mb-1" /> {/* Temperature */}
                  <Skeleton className="h-3 w-20" /> {/* Description */}
                </div>
              ))}
            </div>
          </div>

          {/* Hourly Forecast Skeleton */}
          <div className="relative backdrop-blur-glassmorphic bg-glass-gradient border border-glass-border rounded-2xl w-full">
            <div className="flex items-center gap-2 space-y-0 border-b border-glass-border py-3 px-4 sm:flex-row">
              <div className="grid flex-1 gap-1">
                <Skeleton className="h-6 w-48" /> {/* Title */}
                <Skeleton className="h-4 w-64" /> {/* Subtitle */}
              </div>
              <Skeleton className="h-10 w-[160px] rounded-lg" /> {/* Time Range Selector */}
            </div>
            <div className="p-4">
              <Skeleton className="h-[140px] w-full rounded-xl" /> {/* Chart */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
