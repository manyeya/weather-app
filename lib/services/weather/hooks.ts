"use client"

import { useQuery } from "@tanstack/react-query"
import { getCurrentWeather, getForecast } from "."
import type { ForecastData, WeatherData } from "./types"
import { convertWeatherData } from "@/app/utils/temperature"

export function useCurrentWeather(query: string, units: 'metric' | 'imperial' = 'metric') {
  const result = useQuery<WeatherData>({
    queryKey: ['weather', query],
    queryFn: () => getCurrentWeather(query),
    enabled: !!query,
    select: (data) => convertWeatherData(data, units) as WeatherData
  });
  
  return result;
}

export function useForecast(query: string, units: 'metric' | 'imperial' = 'metric') {
  const result = useQuery<ForecastData>({
    queryKey: ['forecast', query],
    queryFn: () => getForecast(query),
    enabled: !!query,
    select: (data) => convertWeatherData(data, units) as ForecastData
  });
  
  return result;
}
