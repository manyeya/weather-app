'use client';

export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9/5) + 32;
};

export const convertTemperature = (temp: number, units: 'metric' | 'imperial'): number => {
  return units === 'metric' ? temp : celsiusToFahrenheit(temp);
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
