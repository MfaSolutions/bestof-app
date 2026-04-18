import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of, forkJoin } from 'rxjs';
import { WeatherData, City } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; // OpenWeatherMap API key (free tier)
  private readonly API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  // Villes par défaut
  private defaultCities: City[] = [
    {
      name: 'Vaureal',
      country: 'FR',
      lat: 49.0333,
      lon: 2.0333
    },
    {
      name: 'Rafraf',
      country: 'TN',
      lat: 37.1904,
      lon: 10.1837
    }
  ];

  constructor(private http: HttpClient) {}

  getWeatherForCity(city: City): Observable<WeatherData | null> {
    const url = `${this.API_URL}?lat=${city.lat}&lon=${city.lon}&appid=${this.API_KEY}&units=metric&lang=fr`;

    return this.http.get<any>(url).pipe(
      map(response => {
        console.log('Réponse API pour', city.name, response);
        
        // Vérifier que les données nécessaires existent
        if (!response?.main?.temp || !response?.weather?.[0]) {
          console.warn(`Données incomplètes pour ${city.name}`);
          return null;
        }
        
        const weather: WeatherData = {
          city: response.name || city.name,
          country: response.sys?.country || city.country,
          temperature: Math.round(response.main.temp),
          description: response.weather[0].description || 'N/A',
          humidity: response.main.humidity || 0,
          windSpeed: Math.round(response.wind.speed * 10) / 10,
          icon: response.weather[0].icon || '01d',
          lastUpdated: new Date()
        };
        
        console.log('Objet WeatherData créé:', weather);
        return weather;
      }),
      catchError(error => {
        console.error('Erreur API pour', city.name, error);
        return of(null);
      })
    );
  }

  getDefaultCities(): City[] {
    return this.defaultCities;
  }

  getWeatherIconUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  getWeatherForAllDefaultCities(): Observable<(WeatherData | null)[]> {
    const weatherObservables = this.defaultCities.map(city =>
      this.getWeatherForCity(city).pipe(
        catchError(error => {
          console.error(`Erreur pour ${city.name}:`, error);
          return of(null);
        })
      )
    );

    return forkJoin(weatherObservables).pipe(
      catchError(error => {
        console.error('Erreur lors de forkJoin:', error);
        return of([null, null]);
      })
    );
  }
}