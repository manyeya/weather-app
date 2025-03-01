import { getCurrentWeather } from "../weather";
import { IpLocationResponse } from "./types";

const IP_GEOLOCATION_API = 'https://ipapi.co/json/';

// Get location using browser's geolocation API
export const getBrowserLocation = (): Promise<GeolocationPosition> => {
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
export const getIpBasedLocation = async (): Promise<IpLocationResponse> => {
    const response = await fetch(IP_GEOLOCATION_API);
    if (!response.ok) {
        throw new Error('Failed to fetch IP-based location');
    }
    return response.json();
};

// Get city name from coordinates using reverse geocoding via weather API
export const getCityFromCoords = async (lat: number, lon: number): Promise<string> => {
    const weather = await getCurrentWeather(`lat=${lat}&lon=${lon}`);
    return weather.name;
};

