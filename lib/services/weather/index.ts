import { ForecastData, WeatherData } from "./types";

// OpenWeatherMap API utilities
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY || '';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Get current weather data by city name or coordinates
export async function getCurrentWeather(query: string): Promise<WeatherData> {
    const response = await fetch(
        `${BASE_URL}/weather?${query}&units=metric&appid=${API_KEY}`
    );

    const data = await response.json();

    if (!response.ok) {
        if (response.status === 404 || data.cod === '404') {
            throw new Error('City not found. Please check the spelling and try again.');
        }
        throw new Error(data.message || 'Failed to fetch weather data');
    }

    return data;
}

// Get 5-day forecast data by city name or coordinates
export async function getForecast(query: string): Promise<ForecastData> {
    const response = await fetch(
        `${BASE_URL}/forecast?${query}&units=metric&appid=${API_KEY}`
    );

    const data = await response.json();

    if (!response.ok) {
        if (response.status === 404 || data.cod === '404') {
            throw new Error('City not found. Please check the spelling and try again.');
        }
        throw new Error(data.message || 'Failed to fetch forecast data');
    }

    return data;
}
