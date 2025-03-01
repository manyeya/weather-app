import { FC } from 'react';

interface FavoritesCardProps {
  favorites: string[];
  onSelectCity: (city: string) => void;
}

const FavoritesCard: FC<FavoritesCardProps> = ({ favorites, onSelectCity }) => {
  return (
    <div className="relative backdrop-blur-glassmorphic bg-glass-gradient border border-glass-border rounded-2xl p-8 w-full h-full flex flex-col">
      <h2 className="text-2xl font-medium text-white/90 mb-6">Favorite Cities</h2>
      {favorites.length > 0 ? (
        <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
          {favorites.map((city) => (
            <button
              key={city}
              onClick={() => onSelectCity(`q=${city}`)}
              className="w-full px-6 py-4 bg-white/5 border border-glass-border rounded-xl
                  text-white/90 transition-all duration-300 hover:bg-white/10 hover:scale-105
                  text-left overflow-hidden overflow-ellipsis whitespace-nowrap"
            >
              {city}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-white/60 text-center">
            <p className="text-lg mb-2">No favorite cities yet</p>
            <p className="text-sm">Search for a city and click the heart icon to add it to your favorites</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesCard;