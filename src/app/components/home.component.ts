import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <div class="hero-section">
        <h1>BestOf App</h1>
        <p class="hero-subtitle">Votre application tout-en-un pour gérer vos rendez-vous et consulter la météo</p>
      </div>

      <div class="modules-grid">
        <div class="module-card users-card">
          <div class="card-icon">👥</div>
          <h3>Gestion des Utilisateurs</h3>
          <p>Gérez votre base de données utilisateurs avec des fonctionnalités complètes de CRUD.</p>
          <a routerLink="/users" class="btn btn-primary">Accéder aux Utilisateurs</a>
        </div>

        <div class="module-card appointments-card">
          <div class="card-icon">📅</div>
          <h3>Rendez-vous</h3>
          <p>Organisez vos rendez-vous et réunions. Créez, modifiez et suivez vos événements.</p>
          <a routerLink="/appointments" class="btn btn-primary">Voir les Rendez-vous</a>
        </div>

        <div class="module-card weather-card">
          <div class="card-icon">🌤️</div>
          <h3>Météo</h3>
          <p>Consultez la météo actuelle de Vaureal (France) et Rafraf (Tunisie).</p>
          <a routerLink="/weather" class="btn btn-primary">Voir la Météo</a>
        </div>
      </div>

      <div class="features-section">
        <h2>Fonctionnalités Principales</h2>
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">🔐</div>
            <h4>Authentification Sécurisée</h4>
            <p>Système de connexion avec gestion des sessions utilisateur.</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">📱</div>
            <h4>Interface Responsive</h4>
            <p>Application optimisée pour tous les appareils et navigateurs.</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">💾</div>
            <h4>Stockage Local</h4>
            <p>Données sauvegardées automatiquement dans votre navigateur.</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">⚡</div>
            <h4>Performance</h4>
            <p>Application rapide avec rendu côté serveur (SSR).</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .hero-section {
      text-align: center;
      padding: 80px 20px 60px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
    }

    .hero-section h1 {
      font-size: 3.5rem;
      margin: 0 0 20px 0;
      font-weight: 700;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .hero-subtitle {
      font-size: 1.3rem;
      margin: 0;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .modules-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      padding: 60px 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .module-card {
      background: rgba(255, 255, 255, 0.95);
      color: #333;
      border-radius: 15px;
      padding: 30px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .module-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }

    .card-icon {
      font-size: 3rem;
      margin-bottom: 20px;
    }

    .module-card h3 {
      margin: 0 0 15px 0;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .module-card p {
      margin: 0 0 25px 0;
      line-height: 1.6;
      opacity: 0.8;
    }

    .btn {
      display: inline-block;
      padding: 12px 24px;
      text-decoration: none;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }

    .features-section {
      padding: 80px 20px;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
    }

    .features-section h2 {
      text-align: center;
      font-size: 2.5rem;
      margin: 0 0 50px 0;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .feature-item {
      text-align: center;
      padding: 30px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      backdrop-filter: blur(10px);
    }

    .feature-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    .feature-item h4 {
      margin: 0 0 15px 0;
      font-size: 1.3rem;
      font-weight: 600;
    }

    .feature-item p {
      margin: 0;
      line-height: 1.6;
      opacity: 0.9;
    }

    @media (max-width: 768px) {
      .hero-section h1 {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.1rem;
      }

      .modules-grid {
        grid-template-columns: 1fr;
        padding: 40px 20px;
      }

      .features-section h2 {
        font-size: 2rem;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {}