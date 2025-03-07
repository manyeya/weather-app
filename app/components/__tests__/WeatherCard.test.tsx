import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherCard from '../WeatherCard';
import * as storageHooks from '@/lib/services/storage/hooks';
import type { WeatherData } from '@/lib/services/weather/types';

// Mock the storage hooks
jest.mock('@/lib/services/storage/hooks', () => ({
  useIsCityFavorite: jest.fn(),
  useAddFavoriteCity: jest.fn(),
  useRemoveFavoriteCity: jest.fn(),
}));

describe('WeatherCard', () => {
  const mockWeather: WeatherData = {
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

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Setup default mock implementations
    (storageHooks.useIsCityFavorite as jest.Mock).mockReturnValue(false);
    (storageHooks.useAddFavoriteCity as jest.Mock).mockReturnValue({ mutate: jest.fn() });
    (storageHooks.useRemoveFavoriteCity as jest.Mock).mockReturnValue({ mutate: jest.fn() });
  });

  it('renders weather information correctly', () => {
    render(<WeatherCard weather={mockWeather} units="metric" />);

    // Check if main information is rendered
    expect(screen.getByText('London, GB')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();

    // Check if weather details are rendered
    expect(screen.getByText('22°C')).toBeInTheDocument(); // Feels like
    expect(screen.getByText('5 m/s')).toBeInTheDocument(); // Wind speed
    expect(screen.getByText('65%')).toBeInTheDocument(); // Humidity
    expect(screen.getByText('1015 hPa')).toBeInTheDocument(); // Pressure
  });

  it('displays imperial units when specified', () => {
    render(<WeatherCard weather={mockWeather} units="imperial" />);

    expect(screen.getByText('20°F')).toBeInTheDocument();
    expect(screen.getByText('22°F')).toBeInTheDocument();
    expect(screen.getByText('5 mph')).toBeInTheDocument();
  });

  it('shows empty star when city is not favorite', () => {
    (storageHooks.useIsCityFavorite as jest.Mock).mockReturnValue(false);
    render(<WeatherCard weather={mockWeather} units="metric" />);

    expect(screen.getByText('☆')).toBeInTheDocument();
  });

  it('shows filled star when city is favorite', () => {
    (storageHooks.useIsCityFavorite as jest.Mock).mockReturnValue(true);
    render(<WeatherCard weather={mockWeather} units="metric" />);

    expect(screen.getByText('★')).toBeInTheDocument();
  });

  it('calls add to favorites when clicking empty star', () => {
    const mockAddToFavorites = jest.fn();
    (storageHooks.useIsCityFavorite as jest.Mock).mockReturnValue(false);
    (storageHooks.useAddFavoriteCity as jest.Mock).mockReturnValue({ mutate: mockAddToFavorites });

    render(<WeatherCard weather={mockWeather} units="metric" />);
    fireEvent.click(screen.getByRole('button', { name: /add to favorites/i }));

    expect(mockAddToFavorites).toHaveBeenCalledWith('London');
  });

  it('calls remove from favorites when clicking filled star', () => {
    const mockRemoveFromFavorites = jest.fn();
    (storageHooks.useIsCityFavorite as jest.Mock).mockReturnValue(true);
    (storageHooks.useRemoveFavoriteCity as jest.Mock).mockReturnValue({ mutate: mockRemoveFromFavorites });

    render(<WeatherCard weather={mockWeather} units="metric" />);
    fireEvent.click(screen.getByRole('button', { name: /remove from favorites/i }));

    expect(mockRemoveFromFavorites).toHaveBeenCalledWith('London');
  });

  it('renders weather icon with correct URL', () => {
    render(<WeatherCard weather={mockWeather} units="metric" />);
    const weatherIcon = screen.getByAltText('clear sky');
    
    expect(weatherIcon).toHaveAttribute('src', 'https://openweathermap.org/img/wn/01d@2x.png');
  });
});
