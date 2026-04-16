import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
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
      map(response => ({
        city: city.name,
        country: city.country,
        temperature: Math.round(response.main.temp),
        description: response.weather[0].description,
        humidity: response.main.humidity,
        windSpeed: response.wind.speed,
        icon: response.weather[0].icon,
        lastUpdated: new Date()
      })),
      catchError(error => {
        console.error('Erreur lors de la récupération de la météo:', error);
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
      this.getWeatherForCity(city)
    );

    return new Observable(observer => {
      const results: (WeatherData | null)[] = [];
      let completed = 0;

      weatherObservables.forEach((obs, index) => {
        obs.subscribe({
          next: (weather) => {
            results[index] = weather;
            completed++;
            if (completed === weatherObservables.length) {
              observer.next(results);
              observer.complete();
            }
          },
          error: (error) => {
            results[index] = null;
            completed++;
            if (completed === weatherObservables.length) {
              observer.next(results);
              observer.complete();
            }
          }
        });
      });
    });
  }
}