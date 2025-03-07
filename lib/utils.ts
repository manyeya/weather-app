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

type WeatherDataItem = WeatherData | ForecastData['list'][0];

export const convertWeatherData = (data: WeatherData | ForecastData | null, units: 'metric' | 'imperial') => {
  if (!data) return data;

  const convertSingleWeather = (weather: WeatherDataItem) => {
    const convertedMain = {
      ...weather.main,
      temp: convertTemperature(weather.main.temp, units),
      feels_like: convertTemperature(weather.main.feels_like, units),
    };

    if (weather.main.temp_min !== undefined) {
      convertedMain.temp_min = convertTemperature(weather.main.temp_min, units);
    }
    if (weather.main.temp_max !== undefined) {
      convertedMain.temp_max = convertTemperature(weather.main.temp_max, units);
    }

    return {
      ...weather,
      main: convertedMain,
      wind: {
        ...weather.wind,
        speed: convertWindSpeed(weather.wind.speed, units).toPrecision(2)
      }
    };
  };

  // Handle forecast data structure
  if ('list' in data) {
    return {
      ...data,
      list: data.list.map(convertSingleWeather)
    };
  }

  // Handle current weather data structure
  return convertSingleWeather(data);
};
