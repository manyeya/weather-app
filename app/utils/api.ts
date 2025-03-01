// OpenWeatherMap API utilities
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY || '';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Interfaces for weather data
export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
  dt: number;
}

export interface ForecastData {
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    wind: {
      speed: number;
    };
    dt_txt: string;
  }[];
  city: {
    name: string;
    country: string;
  };
}

// Get current weather data by city name
export async function getCurrentWeather(city: string, units: 'metric' | 'imperial' = 'metric'): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&units=${units}&appid=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return response.json();
}

// Get 5-day forecast data by city name
export async function getForecast(city: string, units: 'metric' | 'imperial' = 'metric'): Promise<ForecastData> {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&units=${units}&appid=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data');
  }

  return response.json();
}