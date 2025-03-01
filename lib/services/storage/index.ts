const FAVORITES_KEY = 'weather-app-favorites';

// Get favorite cities from local storage
export const getFavoriteCities = (): string[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorite cities:', error);
    return [];
  }
};

// Add a city to favorites
export const addFavoriteCity = (city: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const favorites = getFavoriteCities();
    if (!favorites.includes(city)) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites, city]));
    }
  } catch (error) {
    console.error('Error adding favorite city:', error);
  }
};

// Remove a city from favorites
export const removeFavoriteCity = (city: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const favorites = getFavoriteCities();
    const updatedFavorites = favorites.filter(favorite => favorite !== city);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error removing favorite city:', error);
  }
}; 

