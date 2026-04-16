export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  lastUpdated: Date;
}

export interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
}