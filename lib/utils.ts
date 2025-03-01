import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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

export const convertWeatherData = (data: any, units: 'metric' | 'imperial') => {
  if (!data) return data;

  const convertSingleWeather = (weather: any) => {
    return {
      ...weather,
      main: {
        ...weather.main,
        temp: convertTemperature(weather.main.temp, units),
        feels_like: convertTemperature(weather.main.feels_like, units),
        temp_min: weather.main.temp_min ? convertTemperature(weather.main.temp_min, units) : undefined,
        temp_max: weather.main.temp_max ? convertTemperature(weather.main.temp_max, units) : undefined,
      },
      wind: {
        ...weather.wind,
        speed: convertWindSpeed(weather.wind.speed, units).toPrecision(2)
      }
    };
  };

  // Handle forecast data structure
  if (data.list) {
    return {
      ...data,
      list: data.list.map(convertSingleWeather)
    };
  }

  // Handle current weather data structure
  return convertSingleWeather(data);
};
