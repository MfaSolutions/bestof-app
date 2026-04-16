import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WeatherData } from '../models/weather.model';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="container">
      <div class="header">
        <h2>Météo</h2>
        <button (click)="refreshWeather()" class="btn btn-primary" [disabled]="loading">
          <span *ngIf="!loading">Actualiser</span>
          <span *ngIf="loading">Chargement...</span>
        </button>
      </div>

      <div *ngIf="error" class="error-message">
        <p>{{ error }}</p>
      </div>

      <div class="weather-grid">
        <div class="weather-card" *ngFor="let weather of weatherData; trackBy: trackByCity">
          <div class="weather-card-content" *ngIf="weather">
            <div class="city-header">
              <h3>{{ weather.city }}, {{ weather.country }}</h3>
              <img [src]="getWeatherIconUrl(weather.icon)" [alt]="weather.description" class="weather-icon">
            </div>

            <div class="temperature">
              <span class="temp-value">{{ weather.temperature }}</span>
              <span class="temp-unit">°C</span>
            </div>

            <div class="description">
              {{ weather.description | titlecase }}
            </div>

            <div class="weather-details">
              <div class="detail-item">
                <span class="detail-label">Humidité:</span>
                <span class="detail-value">{{ weather.humidity }}%</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Vent:</span>
                <span class="detail-value">{{ weather.windSpeed }} m/s</span>
              </div>
            </div>

            <div class="last-updated">
              Mis à jour: {{ formatLastUpdated(weather.lastUpdated) }}
            </div>
          </div>

          <div class="weather-error" *ngIf="!weather">
            <p>❌ Impossible de récupérer la météo pour cette ville</p>
            <small>Vérifiez votre connexion internet</small>
          </div>
        </div>
      </div>

      <div class="info-section">
        <h3>À propos</h3>
        <p>Cette application météo utilise l'API OpenWeatherMap pour afficher les conditions météorologiques actuelles de Vaureal (France) et Rafraf (Tunisie).</p>
        <p>Les données sont mises à jour en temps réel et incluent la température, l'humidité et la vitesse du vent.</p>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .header h2 {
      margin: 0;
      color: #333;
    }

    .weather-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .weather-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 15px;
      padding: 25px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .weather-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
    }

    .city-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .city-header h3 {
      margin: 0;
      font-size: 1.4rem;
      font-weight: 600;
    }

    .weather-icon {
      width: 60px;
      height: 60px;
    }

    .temperature {
      display: flex;
      align-items: baseline;
      margin-bottom: 10px;
    }

    .temp-value {
      font-size: 3.5rem;
      font-weight: 300;
      margin-right: 5px;
    }

    .temp-unit {
      font-size: 1.5rem;
      opacity: 0.8;
    }

    .description {
      font-size: 1.1rem;
      margin-bottom: 20px;
      opacity: 0.9;
    }

    .weather-details {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .detail-label {
      font-size: 0.9rem;
      opacity: 0.8;
      margin-bottom: 2px;
    }

    .detail-value {
      font-size: 1rem;
      font-weight: 600;
    }

    .last-updated {
      text-align: center;
      font-size: 0.8rem;
      opacity: 0.7;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      padding-top: 10px;
    }

    .weather-error {
      text-align: center;
      color: #ff6b6b;
    }

    .weather-error p {
      margin: 0 0 5px 0;
      font-size: 1.1rem;
    }

    .weather-error small {
      opacity: 0.8;
    }

    .error-message {
      background: #ffe6e6;
      color: #d63031;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
      border: 1px solid #fab1a0;
      text-align: center;
    }

    .error-message p {
      margin: 0;
      font-weight: 500;
    }

    .info-section {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 10px;
      margin-top: 30px;
    }

    .info-section h3 {
      margin-top: 0;
      color: #333;
    }

    .info-section p {
      margin: 10px 0;
      line-height: 1.6;
      color: #666;
    }

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: background-color 0.3s;
    }

    .btn-primary {
      background-color: #28a745;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #218838;
    }

    .btn-primary:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .weather-grid {
        grid-template-columns: 1fr;
      }

      .header {
        flex-direction: column;
        gap: 15px;
        text-align: center;
      }

      .weather-details {
        flex-direction: column;
        gap: 10px;
      }
    }
  `]
})
export class WeatherComponent implements OnInit {
  weatherData: (WeatherData | null)[] = [];
  loading = false;
  error: string | null = null;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.loadWeather();
  }

  loadWeather() {
    this.loading = true;
    this.error = null;
    this.weatherService.getWeatherForAllDefaultCities().subscribe({
      next: (data: (WeatherData | null)[]) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement de la météo:', error);
        this.error = 'Erreur lors du chargement de la météo';
        this.loading = false;
      }
    });
  }

  refreshWeather() {
    this.loadWeather();
  }

  getWeatherIconUrl(icon: string): string {
    return this.weatherService.getWeatherIconUrl(icon);
  }

  formatLastUpdated(date: Date): string {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  trackByCity(index: number, item: WeatherData | null): string {
    return item ? item.city : index.toString();
  }
}