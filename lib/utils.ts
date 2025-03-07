import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { WeatherData, ForecastData } from "./services/weather/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9/5) + 32;
};

export const metersPerSecToMph = (mps: number): number => {
  return mps * 2.237; // 1 m/s = 2.237 mph
};

export const convertTemperature = (temp: number, units: 'metric' | 'imperial'): number => {
  return units === 'metric' ? temp : celsiusToFahrenheit(temp);
};

export const convertWindSpeed = (speed: number, units: 'metric' | 'imperial'): number => {
  return units === 'metric' ? speed : metersPerSecToMph(speed);
};

export const convertWeatherData = (data: WeatherData | ForecastData | null, units: 'metric' | 'imperial'): WeatherData | ForecastData | null => {
  if (!data) return data;

  if ('list' in data) {
    // Handle forecast data
    return {
      ...data,
      list: data.list.map(item => ({
        ...item,
        main: {
          ...item.main,
          temp: convertTemperature(item.main.temp, units),
          feels_like: convertTemperature(item.main.feels_like, units),
          temp_min: item.main.temp_min !== undefined ? convertTemperature(item.main.temp_min, units) : undefined,
          temp_max: item.main.temp_max !== undefined ? convertTemperature(item.main.temp_max, units) : undefined,
        },
        wind: {
          ...item.wind,
          speed: Number(convertWindSpeed(item.wind.speed, units).toFixed(2))
        }
      }))
    } as ForecastData;
  }

  // Handle current weather data
  const weatherData = data as WeatherData;
  return {
    ...weatherData,
    main: {
      ...weatherData.main,
      temp: convertTemperature(weatherData.main.temp, units),
      feels_like: convertTemperature(weatherData.main.feels_like, units),
      temp_min: weatherData.main.temp_min !== undefined ? convertTemperature(weatherData.main.temp_min, units) : undefined,
      temp_max: weatherData.main.temp_max !== undefined ? convertTemperature(weatherData.main.temp_max, units) : undefined,
    },
    wind: {
      ...weatherData.wind,
      speed: Number(convertWindSpeed(weatherData.wind.speed, units).toFixed(2))
    }
  } as WeatherData;
};
