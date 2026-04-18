import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
        <h2>🌤️ Météo</h2>
        <button (click)="refreshWeather()" class="btn btn-primary" [disabled]="loading">
          <span *ngIf="!loading">Actualiser</span>
          <span *ngIf="loading">Chargement...</span>
        </button>
      </div>

      <div *ngIf="error" class="error-message">
        <p>{{ error }}</p>
      </div>

      <div *ngIf="!loading && weatherData.length > 0" class="table-container">
        <table class="weather-table">
          <thead>
            <tr>
              <th>Icône</th>
              <th>Ville</th>
              <th>Pays</th>
              <th>Température</th>
              <th>Description</th>
              <th>Humidité</th>
              <th>Vent</th>
              <th>Mis à jour</th>
            </tr>
          </thead>
          <tbody>
            <ng-container *ngFor="let weather of weatherData; trackBy: trackByCity">
              <tr *ngIf="weather" [class.weather-row]="weather">
                <td class="icon-cell">
                  <img [src]="getWeatherIconUrl(weather.icon)" [alt]="weather.description" class="weather-icon">
                </td>
                <td>{{ weather.city }}</td>
                <td>{{ weather.country }}</td>
                <td class="temp-cell"><strong>{{ weather.temperature }}°C</strong></td>
                <td>{{ weather.description | titlecase }}</td>
                <td>{{ weather.humidity }}%</td>
                <td>{{ weather.windSpeed }} m/s</td>
                <td>{{ formatLastUpdated(weather.lastUpdated) }}</td>
              </tr>
              <tr *ngIf="!weather" class="error-row">
                <td colspan="8" class="error-cell">
                  ❌ Impossible de récupérer la météo - Vérifiez votre connexion
                </td>
              </tr>
            </ng-container>
          </tbody>
        </table>
      </div>

      <div *ngIf="loading" class="loading-message">
        <p>⏳ Chargement des données météo...</p>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      border-radius: 10px;
      color: white;
    }

    .header h2 {
      margin: 0;
      font-size: 1.8rem;
    }

    .table-container {
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      margin-bottom: 30px;
    }

    .weather-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }

    .weather-table thead {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .weather-table th {
      padding: 15px;
      text-align: left;
      font-weight: 600;
      border-bottom: 2px solid #e0e0e0;
    }

    .weather-table tbody tr {
      border-bottom: 1px solid #e0e0e0;
      transition: background-color 0.2s ease;
    }

    .weather-table tbody tr:hover {
      background-color: #f5f5f5;
    }

    .weather-row {
      background-color: #ffffff;
    }

    .weather-table td {
      padding: 12px 15px;
      vertical-align: middle;
    }

    .icon-cell {
      text-align: center;
    }

    .weather-icon {
      width: 40px;
      height: 40px;
      display: inline-block;
    }

    .temp-cell {
      font-weight: 600;
      color: #d63031;
      font-size: 1.1rem;
    }

    .error-row {
      background-color: #ffe6e6;
    }

    .error-cell {
      text-align: center;
      color: #d63031;
      font-weight: 500;
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

    .loading-message {
      text-align: center;
      padding: 30px;
      background: #f0f0f0;
      border-radius: 10px;
      color: #666;
      font-size: 1.1rem;
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
      .header {
        flex-direction: column;
        gap: 15px;
        text-align: center;
      }

      .weather-table {
        font-size: 12px;
      }

      .weather-table th,
      .weather-table td {
        padding: 8px;
      }
    }
  `]
})
export class WeatherComponent implements OnInit {
  weatherData: (WeatherData | null)[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private weatherService: WeatherService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadWeather();
  }

  loadWeather() {
    this.loading = true;
    this.error = null;
    console.log('🔄 Début du chargement de la météo...');
    
    this.weatherService.getWeatherForAllDefaultCities().subscribe({
      next: (data: (WeatherData | null)[]) => {
        console.log('✅ Données reçues du service:', data);
        this.weatherData = data;
        this.loading = false;
        console.log('📊 weatherData mis à jour:', this.weatherData);
        console.log('📊 loading:', this.loading);
        console.log('📊 weatherData.length:', this.weatherData.length);
        
        // Forcer la détection du changement
        this.cdr.detectChanges();
        console.log('✅ detectChanges() appelé');
      },
      error: (error: any) => {
        console.error('❌ Erreur lors du chargement de la météo:', error);
        this.error = 'Erreur lors du chargement de la météo. Vérifiez votre connexion.';
        this.loading = false;
        this.cdr.detectChanges();
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