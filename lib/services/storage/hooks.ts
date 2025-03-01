"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getFavoriteCities } from "."

const FAVORITES_KEY = 'weather-app-favorites'

export function useFavoriteCities() {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: getFavoriteCities,
  })
}

export function useAddFavoriteCity() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (city: string) => {
      const favorites = queryClient.getQueryData<string[]>(['favorites']) || []
      if (!favorites.includes(city)) {
        const newFavorites = [...favorites, city]
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
        return newFavorites
      }
      return favorites
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })
}

export function useRemoveFavoriteCity() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (city: string) => {
      const favorites = queryClient.getQueryData<string[]>(['favorites']) || []
      const updatedFavorites = favorites.filter(favorite => favorite !== city)
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))
      return updatedFavorites
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })
}

export function useIsCityFavorite(city: string) {
  const { data: favorites = [] } = useFavoriteCities()
  return favorites.includes(city)
}
