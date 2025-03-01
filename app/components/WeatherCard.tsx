'use client';

import { WeatherData } from '@/lib/services/weather/types';
import { useIsCityFavorite, useAddFavoriteCity, useRemoveFavoriteCity } from '@/lib/services/storage/hooks';

interface WeatherCardProps {
  weather: WeatherData;
  units: 'metric' | 'imperial';
}

export default function WeatherCard({ weather, units }: WeatherCardProps) {
  const isFavorite = useIsCityFavorite(weather.name);
  const { mutate: addToFavorites } = useAddFavoriteCity();
  const { mutate: removeFromFavorites } = useRemoveFavoriteCity();

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(weather.name);
    } else {
      addToFavorites(weather.name);
    }
  };

  const getUnitSymbol = () => units === 'metric' ? '°C' : '°F';
  const getWindSpeedUnit = () => units === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="relative overflow-hidden backdrop-blur-glassmorphic bg-glass-gradient border border-glass-border rounded-2xl p-4 w-full h-full flex flex-col transition-all duration-300 hover:bg-glass-background-hover group">
      <div className="absolute inset-0 bg-glass-background opacity-50"></div>
      
      <div className="relative z-10 flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-medium text-white/90">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-5xl font-light text-white mt-1 tracking-tight">
              {Math.round(weather.main.temp)}{getUnitSymbol()}
            </p>
          </div>
          <button
            onClick={toggleFavorite}
            className={`text-xl transition-transform duration-300 hover:scale-110 ${
              isFavorite ? 'text-yellow-400' : 'text-white/70 hover:text-white'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>
        
        <div className="mt-3 flex items-center">
          <div className="animate-float">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="w-16 h-16 drop-shadow-lg"
            />
          </div>
          <p className="text-base text-white/90 capitalize ml-1">
            {weather.weather[0].description}
          </p>
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <p className="text-white/80 text-xs">Feels like</p>
            <p className="text-white text-base font-medium">
              {Math.round(weather.main.feels_like)}{getUnitSymbol()}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-white/80 text-xs">Wind</p>
            <p className="text-white text-base font-medium">
              {weather.wind.speed} {getWindSpeedUnit()}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-white/80 text-xs">Humidity</p>
            <p className="text-white text-base font-medium">
              {weather.main.humidity}%
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-white/80 text-xs">Pressure</p>
            <p className="text-white text-base font-medium">
              {weather.main.pressure} hPa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
