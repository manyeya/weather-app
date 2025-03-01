'use client';

import { ForecastData } from "@/lib/services/weather/types";

interface DailyForecast {
  date: string;
  temp: number;
  icon: string;
  description: string;
}

interface ForecastCardProps {
  forecast: ForecastData;
  units: 'metric' | 'imperial';
}

export default function ForecastCard({ forecast, units }: ForecastCardProps) {
  const getUnitSymbol = () => units === 'metric' ? '°C' : '°F';

  // Group forecast data by day
  const dailyForecasts = forecast.list.reduce<DailyForecast[]>((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc.find(day => day.date === date)) {
      acc.push({
        date,
        temp: item.main.temp,
        icon: item.weather[0].icon,
        description: item.weather[0].description
      });
    }
    return acc;
  }, []).slice(0, 5); // Get only 5 days

  return (
    <div className="relative backdrop-blur-glassmorphic bg-glass-gradient border border-glass-border rounded-2xl p-8 w-full max-w-4xl mt-6 overflow-hidden">
      <div className="absolute inset-0 bg-glass-background opacity-50"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-medium text-white/90 mb-6">5-Day Forecast</h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {dailyForecasts.map((day, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center p-4 rounded-xl border border-glass-border bg-white/5 backdrop-blur-sm
                transition-all duration-300 hover:bg-white/10 hover:scale-105"
            >
              <p className="font-medium text-white/80">
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <div className="my-2 animate-float">
                <img
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.description}
                  className="w-16 h-16 drop-shadow-lg"
                />
              </div>
              <p className="text-2xl font-light text-white tracking-tight">
                {Math.round(day.temp)}{getUnitSymbol()}
              </p>
              <p className="text-sm text-white/70 text-center capitalize mt-1">
                {day.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
