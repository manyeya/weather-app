import { getCurrentWeather } from "../weather";
import { LocationData, IpLocationResponse } from "./types";

const LOCATION_CACHE_KEY = 'weather-app-location';
const IP_GEOLOCATION_API = 'https://ipapi.co/json/';
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // Cache expiration time (24 hours in milliseconds)

// Save location data to local storage
const saveLocationData = (data: LocationData) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(data));
};

// Get cached location data
const getCachedLocation = (): LocationData | null => {
    if (typeof window === 'undefined') return null;

    try {
        const cached = localStorage.getItem(LOCATION_CACHE_KEY);
        if (!cached) return null;

        const data: LocationData = JSON.parse(cached);
        const now = Date.now();

        // Return null if cache is expired
        if (now - data.timestamp > CACHE_EXPIRATION) {
            localStorage.removeItem(LOCATION_CACHE_KEY);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error reading location cache:', error);
        return null;
    }
};

// Get location using browser's geolocation API
const getBrowserLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by this browser.'));
            return;
        }

        navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    });
};

// Get location using IP geolocation API
const getIpBasedLocation = async (): Promise<IpLocationResponse> => {
    const response = await fetch(IP_GEOLOCATION_API);
    if (!response.ok) {
        throw new Error('Failed to fetch IP-based location');
    }
    return response.json();
};

// Get city name from coordinates using reverse geocoding via weather API
const getCityFromCoords = async (lat: number, lon: number): Promise<string> => {
    const weather = await getCurrentWeather(`lat=${lat}&lon=${lon}`);
    return weather.name;
};

// Main function to get user's location
export const getUserLocation = async (): Promise<LocationData> => {
    // Check cache first
    const cached = getCachedLocation();
    if (cached) {
        return cached;
    }

    try {
        // Try browser geolocation first
        const position = await getBrowserLocation();
        const { latitude: lat, longitude: lon } = position.coords;
        const city = await getCityFromCoords(lat, lon);

        const locationData: LocationData = {
            lat,
            lon,
            city,
            timestamp: Date.now()
        };

        saveLocationData(locationData);
        return locationData;
    } catch (geoError: unknown) {
        const error = geoError as Error;
        console.log('Browser geolocation failed, falling back to IP-based location:', error.message);

        // Fall back to IP-based location
        try {
            const ipLocation = await getIpBasedLocation();
            const locationData: LocationData = {
                lat: ipLocation.latitude,
                lon: ipLocation.longitude,
                city: ipLocation.city,
                timestamp: Date.now()
            };

            saveLocationData(locationData);
            return locationData;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new Error('Failed to get location: ' + errorMessage);
        }
    }
};
