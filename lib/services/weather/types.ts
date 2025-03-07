// Interfaces for weather data
export interface WeatherData {
    name: string;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
      pressure: number;
      temp_min?: number;
      temp_max?: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    wind: {
      speed: number;
    };
    sys: {
      country: string;
    };
    dt: number;
  }
  
  export interface ForecastData {
    list: {
      dt: number;
      main: {
        temp: number;
        feels_like: number;
        humidity: number;
        temp_min?: number;
        temp_max?: number;
      };
      weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
      }[];
      wind: {
        speed: number;
      };
      dt_txt: string;
    }[];
    city: {
      name: string;
      country: string;
    };
  }
