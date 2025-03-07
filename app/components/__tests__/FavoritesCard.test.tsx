import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FavoritesCard from '../FavoritesCard';
import * as weatherHooks from '@/lib/services/weather/hooks';
import type { WeatherData } from '@/lib/services/weather/types';

// Mock the weather hooks
jest.mock('@/lib/services/weather/hooks', () => ({
  useCurrentWeather: jest.fn()
}));

describe('FavoritesCard', () => {
  const mockWeatherData: WeatherData = {
    name: 'London',
    sys: { country: 'GB' },
    main: {
      temp: 20,
      feels_like: 22,
      humidity: 65,
      pressure: 1015
    },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d'
      }
    ],
    wind: {
      speed: 5
    },
    dt: 1646870400
  };

  const mockOnSelectCity = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock implementation for weather data
    (weatherHooks.useCurrentWeather as jest.Mock).mockReturnValue({
      data: mockWeatherData
    });
  });

  it('renders no favorites message when list is empty', () => {
    render(<FavoritesCard favorites={[]} onSelectCity={mockOnSelectCity} />);

    expect(screen.getByText('No favorite cities yet')).toBeInTheDocument();
    expect(screen.getByText('Search for a city and click the star icon to add it to your favorites')).toBeInTheDocument();
  });

  it('renders up to 3 favorite cities in the main view', () => {
    const favorites = ['London', 'Paris', 'New York', 'Tokyo'];
    render(<FavoritesCard favorites={favorites} onSelectCity={mockOnSelectCity} />);

    // Should only show first 3 cities
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.queryByText('Tokyo')).not.toBeInTheDocument();
  });

  it('shows "See More" button when there are more than 3 favorites', () => {
    const favorites = ['London', 'Paris', 'New York', 'Tokyo'];
    render(<FavoritesCard favorites={favorites} onSelectCity={mockOnSelectCity} />);

    expect(screen.getByText('See More (1 more)')).toBeInTheDocument();
  });

  it('displays weather information for each favorite city', () => {
    render(<FavoritesCard favorites={['London']} onSelectCity={mockOnSelectCity} />);

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('GB')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
  });

  it('calls onSelectCity when clicking a city', () => {
    render(<FavoritesCard favorites={['London']} onSelectCity={mockOnSelectCity} />);

    fireEvent.click(screen.getByText('London').closest('button')!);
    expect(mockOnSelectCity).toHaveBeenCalledWith('q=London');
  });

  describe('Sidebar/Bottom Sheet', () => {
    it('opens sidebar when clicking See More', () => {
      const favorites = ['London', 'Paris', 'New York', 'Tokyo'];
      render(<FavoritesCard favorites={favorites} onSelectCity={mockOnSelectCity} />);

      fireEvent.click(screen.getByText('See More (1 more)'));
      
      // Should now show all cities including Tokyo
      expect(screen.getByText('Tokyo')).toBeInTheDocument();
      expect(screen.getByText('All Favorites')).toBeInTheDocument();
    });

    it('closes sidebar when clicking close button', () => {
      const favorites = ['London', 'Paris', 'New York', 'Tokyo'];
      render(<FavoritesCard favorites={favorites} onSelectCity={mockOnSelectCity} />);

      // Open sidebar
      fireEvent.click(screen.getByText('See More (1 more)'));
      expect(screen.getByText('All Favorites')).toBeInTheDocument();

      // Close sidebar
      fireEvent.click(screen.getByText('✕'));
      expect(screen.queryByText('All Favorites')).not.toBeInTheDocument();
    });

    it('selects city and closes sidebar when clicking a city in sidebar', () => {
      const favorites = ['London', 'Paris', 'New York', 'Tokyo'];
      render(<FavoritesCard favorites={favorites} onSelectCity={mockOnSelectCity} />);

      // Open sidebar and click Tokyo
      fireEvent.click(screen.getByText('See More (1 more)'));
      fireEvent.click(screen.getByText('Tokyo'));

      // Should call onSelectCity and close sidebar
      expect(mockOnSelectCity).toHaveBeenCalledWith('q=Tokyo');
      expect(screen.queryByText('All Favorites')).not.toBeInTheDocument();
    });
  });
});
