import { FC } from 'react';

interface FavoritesCardProps {
  favorites: string[];
  onSelectCity: (city: string) => void;
}

const FavoritesCard: FC<FavoritesCardProps> = ({ favorites, onSelectCity }) => {
  return (
    <div className="relative backdrop-blur-glassmorphic bg-glass-gradient border border-glass-border rounded-2xl p-4 w-full h-full flex flex-col overflow-hidden">
      <h2 className="text-lg font-medium text-white/90 mb-3">Favorite Cities</h2>
      {favorites.length > 0 ? (
        <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar max-h-[250px] w-full">
          {favorites.map((city) => (
            <button
              key={city}
              onClick={() => onSelectCity(`q=${city}`)}
              className="w-full px-3 py-2 bg-white/5 border border-glass-border rounded-lg
                  text-white/90 transition-all duration-300 hover:bg-white/10 
                  text-left overflow-hidden overflow-ellipsis whitespace-nowrap text-sm"
            >
              {city}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center max-h-[150px]">
          <div className="text-white/60 text-center">
            <p className="text-base mb-1">No favorite cities yet</p>
            <p className="text-xs">Search for a city and click the star icon to add it to your favorites</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesCard;