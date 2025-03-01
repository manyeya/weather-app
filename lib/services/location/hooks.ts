"use client"

import { useQuery } from "@tanstack/react-query"
import { getBrowserLocation, getIpBasedLocation, getCityFromCoords } from "."
import { LocationData } from "./types"

const CACHE_TIME = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

export function useUserLocation() {
  return useQuery<LocationData>({
    queryKey: ['userLocation'],
    queryFn: async () => {
      try {
        // Try browser geolocation first
        const position = await getBrowserLocation()
        const { latitude: lat, longitude: lon } = position.coords
        const city = await getCityFromCoords(lat, lon)

        return {
          lat,
          lon,
          city,
          timestamp: Date.now()
        }
      } catch (geoError) {
        console.log('Browser geolocation failed, falling back to IP-based location:', geoError)

        // Fall back to IP-based location
        const ipLocation = await getIpBasedLocation()
        return {
          lat: ipLocation.latitude,
          lon: ipLocation.longitude,
          city: ipLocation.city,
          timestamp: Date.now()
        }
      }
    },
    staleTime: CACHE_TIME, // Consider data fresh for 24 hours
    gcTime: CACHE_TIME, // Keep data in cache for garbage collection
    retry: false, // Don't retry on failure as we already have a fallback mechanism
  })
}
