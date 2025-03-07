'use client';

import { ForecastData } from "@/lib/services/weather/types";
import Image from "next/image";

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
    <div className="relative backdrop-blur-glassmorphic bg-glass-gradient border border-glass-border rounded-2xl p-4 w-full mt-3 overflow-hidden">
      <div className="absolute inset-0 bg-glass-background opacity-50"></div>
      
      <div className="relative z-10 px-1">
        <h3 className="text-lg font-medium text-white/90 mb-3 px-2">5-Day Forecast</h3>
        <div className="flex sm:grid sm:grid-cols-5 gap-3 overflow-x-auto pb-4 px-2 snap-x snap-mandatory -mx-2 sm:mx-0 sm:pb-0 sm:overflow-x-visible">
          {dailyForecasts.map((day, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-[120px] sm:w-auto snap-center flex flex-col items-center p-3 rounded-xl border border-glass-border bg-white/5 backdrop-blur-sm
                transition-all duration-300 hover:bg-white/10 hover:scale-105 touch-pan-x"
            >
              <p className="font-medium text-white/80 text-sm">
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
                <Image
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.description}
                  className="w-12 h-12 drop-shadow-lg"
                  width={48}
                  height={48}
                />
              <p className="text-xl font-light text-white tracking-tight">
                {Math.round(day.temp)}{getUnitSymbol()}
              </p>
              <p className="text-xs text-white/70 text-center capitalize">
                {day.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
