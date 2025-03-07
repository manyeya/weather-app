import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ForecastCard from '../ForecastCard';
import type { ForecastData } from '@/lib/services/weather/types';

describe('ForecastCard', () => {
  const mockForecast: ForecastData = {
    list: [
      {
        dt: 1646870400,
        main: {
          temp: 20,
          feels_like: 22,
          humidity: 65
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
        dt_txt: '2024-03-07 12:00:00'
      },
      // Add different times on the same day - these should be grouped
      {
        dt: 1646881200,
        main: {
          temp: 22,
          feels_like: 24,
          humidity: 60
        },
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02d'
          }
        ],
        wind: {
          speed: 6
        },
        dt_txt: '2024-03-07 15:00:00'
      },
      // Add a different day
      {
        dt: 1646956800,
        main: {
          temp: 18,
          feels_like: 19,
          humidity: 70
        },
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10d'
          }
        ],
        wind: {
          speed: 4
        },
        dt_txt: '2024-03-08 12:00:00'
      },
    ],
    city: {
      name: 'London',
      country: 'GB'
    }
  };

  it('renders forecast information correctly', () => {
    render(<ForecastCard forecast={mockForecast} units="metric" />);

    // Check heading
    expect(screen.getByText('5-Day Forecast')).toBeInTheDocument();

    // Check first day forecast
    const day1 = new Date(mockForecast.list[0].dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
    expect(screen.getByText(day1)).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
    expect(screen.getByText('clear sky')).toBeInTheDocument();
  });

  it('displays imperial units when specified', () => {
    render(<ForecastCard forecast={mockForecast} units="imperial" />);

    // Temperature should be displayed in Fahrenheit
    expect(screen.getByText('20°F')).toBeInTheDocument();
  });

  it('renders weather icons for each day', () => {
    render(<ForecastCard forecast={mockForecast} units="metric" />);

    const icon = screen.getByAltText('clear sky');
    expect(icon).toHaveAttribute('src', 'https://openweathermap.org/img/wn/01d@2x.png');
  });

  it('groups forecasts by day and shows only first forecast of each day', () => {
    render(<ForecastCard forecast={mockForecast} units="metric" />);

    // Should show only one instance of the first day's temperature
    const temps = screen.getAllByText('20°C');
    expect(temps).toHaveLength(1);

    // Should show the second day's forecast
    expect(screen.getByText('18°C')).toBeInTheDocument();
  });
});
