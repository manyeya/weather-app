'use client';

import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import FavoritesCard from './components/FavoritesCard';
import { HourlyForecast } from './components/HourlyForecast';
import Loading from './components/loading';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center px-4 py-6">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header Section */}
        {currentWeather && !isLoadingWeather && !isLoadingForecast && (
          <div className="flex flex-col items-center mb-4">
            <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-4 sm:gap-2 items-center">
              <div className="w-full sm:flex-1">
                <SearchBar onSearch={handleSearch} />
              </div>
              <button
                onClick={toggleUnits}
                className="w-full sm:w-auto px-6 py-4 backdrop-blur-glassmorphic bg-glass-gradient border border-glass-border rounded-2xl
                  text-white/90 transition-all duration-300 hover:bg-glass-background-hover hover:scale-105 whitespace-nowrap text-sm"
              >
                {units === 'metric' ? '°C to °F' : '°F to °C'}
              </button>
            </div>
          </div>
        )}

        {/* Loading and Error States */}
        {(isLoadingWeather || isLoadingForecast) && <Loading />}

        {(weatherError || forecastError) && (
          <div className="relative backdrop-blur-glassmorphic bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-white/90 text-center max-w-2xl mx-auto">
            <p className="text-base">
              {weatherError instanceof Error ? weatherError.message :
                forecastError instanceof Error ? forecastError.message :
                  'Failed to fetch weather data. Please try again.'}
            </p>
          </div>
        )}

        {/* Main Content */}
        {currentWeather && !isLoadingWeather && !isLoadingForecast && (
          <div className="space-y-4 flex flex-col w-full">
            {/* Current Weather and Favorites Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-full">
                <WeatherCard weather={currentWeather} units={units} />
              </div>
              <div className="h-full">
                <FavoritesCard favorites={favorites} onSelectCity={handleSelectCity} />
              </div>
            </div>

            {/* Forecast Sections */}
            {forecast && (
              <>
                <ForecastCard forecast={forecast} units={units} />
                <HourlyForecast forecast={forecast} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
