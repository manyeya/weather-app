import { ForecastData, WeatherData } from "./types";

// OpenWeatherMap API utilities
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY || '';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Get current weather data by city name or coordinates
export async function getCurrentWeather(query: string, units: 'metric' | 'imperial' = 'metric'): Promise<WeatherData> {
    const response = await fetch(
        `${BASE_URL}/weather?${query}&units=${units}&appid=${API_KEY}`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    return response.json();
}

// Get 5-day forecast data by city name or coordinates
export async function getForecast(query: string, units: 'metric' | 'imperial' = 'metric'): Promise<ForecastData> {
    const response = await fetch(
        `${BASE_URL}/forecast?${query}&units=${units}&appid=${API_KEY}`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch forecast data');
    }

    return response.json();
}
