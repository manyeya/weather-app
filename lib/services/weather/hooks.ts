"use client"

import { useQuery } from "@tanstack/react-query"
import { getCurrentWeather, getForecast } from "."
import type { ForecastData, WeatherData } from "./types"

export function useCurrentWeather(query: string, units: 'metric' | 'imperial' = 'metric') {
  return useQuery<WeatherData>({
    queryKey: ['weather', query, units],
    queryFn: () => getCurrentWeather(query, units),
    enabled: !!query,
  })
}

export function useForecast(query: string, units: 'metric' | 'imperial' = 'metric') {
  return useQuery<ForecastData>({
    queryKey: ['forecast', query, units],
    queryFn: () => getForecast(query, units),
    enabled: !!query,
  })
}
