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

    /* Tablettes et écrans moyens */
    @media (max-width: 1024px) {
      .container {
        padding: 15px;
      }

      .header {
        padding: 15px;
        gap: 10px;
      }

      .header h2 {
        font-size: 1.5rem;
      }

      .weather-table {
        font-size: 13px;
      }

      .weather-table th,
      .weather-table td {
        padding: 10px;
      }

      .weather-icon {
        width: 35px;
        height: 35px;
      }
    }

    /* Tablettes en portrait et petits mobiles */
    @media (max-width: 768px) {
      .container {
        padding: 12px;
      }

      .header {
        flex-direction: column;
        gap: 12px;
        text-align: center;
        padding: 15px;
      }

      .header h2 {
        font-size: 1.3rem;
        margin: 0;
      }

      .btn {
        padding: 10px 15px;
        font-size: 14px;
        width: 100%;
        max-width: 200px;
      }

      .table-container {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        border-radius: 8px;
      }

      .weather-table {
        font-size: 12px;
        min-width: 100%;
      }

      .weather-table th,
      .weather-table td {
        padding: 8px 6px;
        word-break: break-word;
      }

      .weather-icon {
        width: 32px;
        height: 32px;
      }

      .icon-cell {
        padding: 8px 4px;
      }

      .temp-cell {
        font-size: 1rem;
      }

      .error-message {
        padding: 12px;
        font-size: 0.9rem;
      }

      .loading-message {
        padding: 20px;
        font-size: 1rem;
      }
    }

    /* Petits mobiles */
    @media (max-width: 480px) {
      .container {
        padding: 8px;
      }

      .header {
        flex-direction: column;
        gap: 10px;
        padding: 12px;
        border-radius: 6px;
      }

      .header h2 {
        font-size: 1.2rem;
        margin: 0;
      }

      .btn {
        padding: 10px 12px;
        font-size: 13px;
        width: 100%;
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .table-container {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        border-radius: 6px;
        margin-bottom: 20px;
      }

      .weather-table {
        font-size: 11px;
        min-width: 600px;
      }

      .weather-table thead {
        position: sticky;
        top: 0;
        z-index: 10;
      }

      .weather-table th {
        padding: 6px 4px;
        text-align: center;
        font-size: 10px;
        font-weight: 600;
        white-space: nowrap;
      }

      .weather-table td {
        padding: 6px 4px;
        text-align: center;
        font-size: 10px;
      }

      .icon-cell {
        padding: 6px 2px;
        text-align: center;
      }

      .weather-icon {
        width: 28px;
        height: 28px;
      }

      .temp-cell {
        font-size: 0.9rem;
        font-weight: 600;
      }

      .error-row {
        font-size: 10px;
      }

      .error-cell {
        padding: 10px 4px;
        font-size: 10px;
      }

      .error-message {
        padding: 10px;
        font-size: 0.85rem;
        border-radius: 6px;
        margin-bottom: 15px;
      }

      .error-message p {
        margin: 0;
      }

      .loading-message {
        padding: 15px;
        font-size: 0.9rem;
        border-radius: 6px;
      }
    }

    /* Ultra petits écrans */
    @media (max-width: 360px) {
      .container {
        padding: 6px;
      }

      .header {
        padding: 10px;
        gap: 8px;
      }

      .header h2 {
        font-size: 1.1rem;
      }

      .btn {
        padding: 8px 10px;
        font-size: 12px;
        min-height: 40px;
      }

      .weather-table {
        font-size: 10px;
        min-width: 550px;
      }

      .weather-table th {
        padding: 5px 3px;
        font-size: 9px;
      }

      .weather-table td {
        padding: 5px 3px;
        font-size: 9px;
      }

      .weather-icon {
        width: 24px;
        height: 24px;
      }

      .temp-cell {
        font-size: 0.85rem;
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