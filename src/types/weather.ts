export interface WeatherForecastItem {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  pop: number;
  dt_txt: string;
}

export interface OpenWeatherResponse {
  list: WeatherForecastItem[];
  city: {
    name: string;
  };
}

export interface WeatherSummary {
  city: string;
  date: string;
  tempMin: number;
  tempMax: number;
  description: string;
  icon: string;
  pop: number;
  windSpeed: number;
}

export interface WeatherTrendPoint {
  date: string;
  temp: number;
  pop: number;
}

export interface CityCoordinate {
  name: string;
  lat: number;
  lon: number;
}
