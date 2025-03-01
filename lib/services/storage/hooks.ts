"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getFavoriteCities, addFavoriteCity, removeFavoriteCity } from "."

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
      addFavoriteCity(city)
      return getFavoriteCities()
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
      removeFavoriteCity(city)
      return getFavoriteCities()
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
