import { FC, useState } from 'react';
import { useCurrentWeather } from '@/lib/services/weather/hooks';

interface FavoritesCardProps {
  favorites: string[];
  onSelectCity: (city: string) => void;
}

interface WeatherButtonProps {
  city: string;
  onSelect: (query: string) => void;
  className?: string;
}

const CityWeatherButton: FC<WeatherButtonProps> = ({ city, onSelect, className }) => {
  const { data: weather } = useCurrentWeather(`q=${city}`);

  return (
    <button
      onClick={() => onSelect(`q=${city}`)}
      className={`block w-full px-3 py-2 bg-white/5 border border-glass-border rounded-lg
          text-white/90 transition-all duration-300 hover:bg-white/10 
          text-left text-sm ${className || ''}`}
      type="button"
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="font-medium">{city}</span>
          {weather?.sys.country && (
            <span className="ml-2 text-white/60 text-xs">{weather.sys.country}</span>
          )}
        </div>
        {weather && (
          <div className="flex items-center space-x-2">
            <img 
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="w-8 h-8"
            />
            <span>{Math.round(weather.main.temp)}°C</span>
          </div>
        )}
      </div>
    </button>
  );
};

const FavoritesCard: FC<FavoritesCardProps> = ({ favorites, onSelectCity }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const displayedFavorites = favorites.slice(0, 4);
  const hasMoreFavorites = favorites.length > 4;

  return (
    <>
      <div className="relative backdrop-blur-glassmorphic bg-glass-gradient border border-glass-border rounded-2xl p-4 w-full h-full flex flex-col overflow-hidden">
        <h2 className="text-lg font-medium text-white/90 mb-3">Favorite Cities</h2>
        {favorites.length > 0 ? (
          <div className="flex flex-col">
            <div className="space-y-2 w-full max-w-full">
              {displayedFavorites.map((city) => (
                <CityWeatherButton
                  key={city}
                  city={city}
                  onSelect={onSelectCity}
                />
              ))}
            </div>
            {hasMoreFavorites && (
              <button
                onClick={() => setShowSidebar(true)}
                className="mt-4 w-full px-3 py-2 bg-white/5 border border-glass-border rounded-lg
                    text-white/90 transition-all duration-300 hover:bg-white/10 
                    text-center text-sm"
              >
                See More ({favorites.length - 4} more)
              </button>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center max-h-[150px] w-full max-w-full">
            <div className="text-white/60 text-center space-y-4 flex justify-center items-center flex-col">
              <p className="text-base mb-1">No favorite cities yet</p>
              <p className="text-xs md:w-32 text-center">Search for a city and click the star icon to add it to your favorites</p>
            </div>
          </div>
        )}
      </div>

      {/* Floating Sidebar */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-md h-full bg-glass-gradient border-l border-glass-border p-6 animate-slide-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-white/90">All Favorites</h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="text-white/70 hover:text-white/90"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-8rem)]">
              {favorites.map((city) => (
                <CityWeatherButton
                  key={city}
                  city={city}
                  onSelect={(query) => {
                    onSelectCity(query);
                    setShowSidebar(false);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FavoritesCard;
