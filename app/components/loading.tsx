'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center px-4 py-6">
      <div className="w-full max-w-7xl mx-auto" role="main">
        <div className="flex flex-col items-center mb-4">
          <div className="w-full justify-between flex flex-col sm:flex-row gap-4 sm:gap-2 items-center">
            <div className="w-full sm:flex-1">
              <div className="animate-pulse bg-primary/10 h-14 w-full rounded-2xl" role="progressbar" />
            </div>
            <div className="animate-pulse bg-primary/10 h-14 w-full sm:w-32 rounded-2xl" role="progressbar" />
          </div>
        </div>

        <div className="space-y-4 flex flex-col w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Weather Card Skeleton */}
            <div className="h-full">
              <div className="relative backdrop-blur-glassmorphic bg-glass-gradient border border-glass-border rounded-2xl p-4 w-full h-full">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="animate-pulse rounded-md bg-primary/10 h-6 w-48" role="progressbar" />
                    <div className="animate-pulse rounded-md bg-primary/10 h-12 w-24" role="progressbar" />
                  </div>
                  <div className="animate-pulse bg-primary/10 h-6 w-6 rounded-full" role="progressbar" />
                </div>
                <div className="mt-3 flex items-center">
                  <div className="animate-pulse bg-primary/10 h-16 w-16 rounded-full" role="progressbar" />
                  <div className="animate-pulse rounded-md bg-primary/10 h-5 w-32 ml-2" role="progressbar" />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {Array(4).fill(null).map((_, i) => (
                    <div key={i} className="space-y-1">
                      <div className="animate-pulse rounded-md bg-primary/10 h-3 w-16" role="progressbar" />
                      <div className="animate-pulse rounded-md bg-primary/10 h-5 w-20" role="progressbar" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Favorites Card Skeleton */}
            <div className="h-full">
              <div className="relative backdrop-blur-glassmorphic bg-glass-gradient border border-glass-border rounded-2xl p-4 w-full h-full">
                <div className="animate-pulse rounded-md bg-primary/10 h-6 w-32 mb-3" role="progressbar" />
                <div className="space-y-2">
                  {Array(3).fill(null).map((_, i) => (
                    <div key={i} className="animate-pulse bg-primary/10 h-12 w-full rounded-lg" role="progressbar" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Forecast Card Skeleton */}
          <div className="relative backdrop-blur-glassmorphic bg-glass-gradient border border-glass-border rounded-2xl p-4 w-full">
            <div className="animate-pulse rounded-md bg-primary/10 h-6 w-32 mb-3" role="progressbar" />
            <div className="flex sm:grid sm:grid-cols-5 gap-3 overflow-x-auto pb-4 px-2 snap-x snap-mandatory -mx-2 sm:mx-0 sm:pb-0 sm:overflow-x-visible">
              {Array(5).fill(null).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-[120px] sm:w-auto snap-center flex flex-col items-center p-3 rounded-xl border border-glass-border bg-white/5">
                  <div className="animate-pulse rounded-md bg-primary/10 h-4 w-16 mb-2" role="progressbar" />
                  <div className="animate-pulse bg-primary/10 h-12 w-12 rounded-full mb-2" role="progressbar" />
                  <div className="animate-pulse rounded-md bg-primary/10 h-6 w-12 mb-1" role="progressbar" />
                  <div className="animate-pulse rounded-md bg-primary/10 h-3 w-20" role="progressbar" />
                </div>
              ))}
            </div>
          </div>

          {/* Hourly Forecast Skeleton */}
          <div className="relative backdrop-blur-glassmorphic bg-glass-gradient border border-glass-border rounded-2xl w-full">
            <div className="flex flex-col sm:flex-row items-center gap-3 border-b border-glass-border py-3 px-4">
              <div className="grid flex-1 gap-1 text-center w-full sm:text-left">
                <div className="animate-pulse rounded-md bg-primary/10 h-6 w-48" role="progressbar" />
                <div className="animate-pulse rounded-md bg-primary/10 h-4 w-64" role="progressbar" />
              </div>
              <div className="animate-pulse bg-primary/10 h-11 w-full sm:w-[160px] rounded-lg" role="progressbar" />
            </div>
            <div className="pt-2 sm:pt-3 overflow-x-auto -mx-4 px-4">
              <div className="animate-pulse bg-primary/10 h-[180px] sm:h-[140px] w-full min-w-[500px] rounded-xl" role="progressbar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
