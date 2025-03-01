'use client';

import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import FavoritesCard from './components/FavoritesCard';
import { useCurrentWeather, useForecast } from '@/lib/services/weather/hooks';
import { useUserLocation } from '@/lib/services/location/hooks';
import { useFavoriteCities } from '@/lib/services/storage/hooks';

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');

  const { data: favorites = [] } = useFavoriteCities();
  const { data: currentWeather, isLoading: isLoadingWeather, error: weatherError } = useCurrentWeather(query, units);
  const { data: forecast, isLoading: isLoadingForecast, error: forecastError } = useForecast(query, units);
  const { data: location, isError: locationError } = useUserLocation();

  useEffect(() => {
    if (location) {
      setQuery(`lat=${location.lat}&lon=${location.lon}`);
    } else if (locationError) {
      console.error('Failed to get initial location');
      setQuery('q=Pretoria');
    }
  }, [location, locationError]);

  const toggleUnits = () => {
    setUnits(units === 'metric' ? 'imperial' : 'metric');
  };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  const handleSelectCity = (cityQuery: string) => {
    setQuery(cityQuery);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-5xl font-light text-white/90 tracking-wide mb-8">
            Weather Forecast
          </h1>
          <div className="w-full max-w-2xl flex justify-between items-center gap-4">
            <SearchBar onSearch={handleSearch} />
            <button
              onClick={toggleUnits}
              className="px-6 py-4 backdrop-blur-glassmorphic bg-glass-gradient border border-glass-border rounded-2xl
                text-white/90 transition-all duration-300 hover:bg-glass-background-hover hover:scale-105 whitespace-nowrap"
            >
              {units === 'metric' ? '°C to °F' : '°F to °C'}
            </button>
          </div>
        </div>

        {/* Loading and Error States */}
        {(isLoadingWeather || isLoadingForecast) && (
          <div className="text-center text-white/90 text-xl animate-pulse py-12">
            Loading...
          </div>
        )}

        {(weatherError || forecastError) && (
          <div className="relative backdrop-blur-glassmorphic bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-white/90 text-center max-w-2xl mx-auto">
            <p className="text-lg mb-2">
              {weatherError instanceof Error ? weatherError.message :
                forecastError instanceof Error ? forecastError.message :
                  'Failed to fetch weather data. Please try again.'}
            </p>
          </div>
        )}

        {/* Main Content */}
        {currentWeather && !isLoadingWeather && !isLoadingForecast && (
          <div className="space-y-8">
            {/* Current Weather and Favorites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <WeatherCard weather={currentWeather} units={units} />
              <FavoritesCard favorites={favorites} onSelectCity={handleSelectCity} />
            </div>

            {/* Forecast Section */}
            {forecast && <ForecastCard forecast={forecast} units={units} />}
          </div>
        )}
      </div>
    </div>
  );
}
