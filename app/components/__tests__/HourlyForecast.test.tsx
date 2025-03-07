import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HourlyForecast } from '../HourlyForecast';
import type { ForecastData } from '@/lib/services/weather/types';

// Mock the components
jest.mock('@/components/ui/chart', () => ({
  Chart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="chart">{children}</div>
  ),
  ChartContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="chart-container">{children}</div>
  ),
  ChartTooltip: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="chart-tooltip">{children}</div>
  ),
  ChartTooltipContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="chart-tooltip-content">{children}</div>
  ),
}));

// Mock the Recharts components
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  AreaChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="area-chart">{children}</div>
  ),
  Area: () => <div data-testid="area" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  defs: () => null,
  linearGradient: () => null,
  stop: () => null,
}));

describe('HourlyForecast', () => {
  const mockForecast: ForecastData = {
    list: Array.from({ length: 24 }, (_, i) => ({
      dt: 1646870400 + (i * 3600), // Hourly timestamps
      main: {
        temp: 20 + i, // Different temperature for each hour
        feels_like: 22 + i,
        humidity: 65,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      wind: {
        speed: 5,
      },
      dt_txt: new Date(1646870400000 + (i * 3600000)).toISOString(),
    })),
    city: {
      name: 'London',
      country: 'GB',
    },
  };

  it('renders hourly forecast information correctly', () => {
    render(<HourlyForecast forecast={mockForecast} />);

    // Check title and subtitle
    expect(screen.getByText('Hourly Temperature')).toBeInTheDocument();
    expect(screen.getByText(/Temperature breakdown for London/)).toBeInTheDocument();

    // Verify chart components are rendered
    expect(screen.getByTestId('chart-container')).toBeInTheDocument();
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
  });

  it('shows time range select button', () => {
    render(<HourlyForecast forecast={mockForecast} />);

    // Find the select button
    const select = screen.getByRole('combobox', { name: /Select time range/i });
    expect(select).toBeInTheDocument();

    // Check default value is displayed
    expect(select).toHaveTextContent('Next 24 hours');
  });

  it('changes time range when selecting different option', async () => {
    render(<HourlyForecast forecast={mockForecast} />);

    // Find and interact with select button
    const select = screen.getByRole('combobox', { name: /Select time range/i });
    // Open select dropdown
    fireEvent.click(select);
    // Select 12h option
    const option = screen.getByText('Next 12 hours');
    fireEvent.click(option);

    // Verify the change takes effect
    expect(select).toHaveTextContent('Next 12 hours');
  });
});
