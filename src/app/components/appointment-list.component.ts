import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Appointment } from '../models/appointment.model';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="header">
        <h2>Mes Rendez-vous</h2>
        <a routerLink="/appointments/new" class="btn btn-primary">Nouveau Rendez-vous</a>
      </div>

      <div class="appointments-grid">
        <div class="appointment-card upcoming" *ngFor="let appointment of upcomingAppointments">
          <div class="card-header">
            <h3>{{ appointment.title }}</h3>
            <span class="status" [class]="'status-' + appointment.status">
              {{ getStatusLabel(appointment.status) }}
            </span>
          </div>
          <div class="card-body">
            <p *ngIf="appointment.description" class="description">{{ appointment.description }}</p>
            <div class="details">
              <div class="detail-item">
                <i class="icon-calendar"></i>
                <span>{{ formatDate(appointment.date) }}</span>
              </div>
              <div class="detail-item">
                <i class="icon-clock"></i>
                <span>{{ appointment.time }}</span>
              </div>
              <div class="detail-item" *ngIf="appointment.location">
                <i class="icon-location"></i>
                <span>{{ appointment.location }}</span>
              </div>
            </div>
          </div>
          <div class="card-actions">
            <a [routerLink]="['/appointments', appointment.id]" class="btn btn-sm btn-info">Voir</a>
            <a [routerLink]="['/appointments', appointment.id, 'edit']" class="btn btn-sm btn-warning">Modifier</a>
            <button (click)="deleteAppointment(appointment.id)" class="btn btn-sm btn-danger">Supprimer</button>
          </div>
        </div>
      </div>

      <div class="no-appointments" *ngIf="upcomingAppointments.length === 0">
        <p>Aucun rendez-vous à venir.</p>
        <a routerLink="/appointments/new" class="btn btn-primary">Créer votre premier rendez-vous</a>
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

    .appointments-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .appointment-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .appointment-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }

    .card-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .card-header h3 {
      margin: 0;
      font-size: 1.2rem;
    }

    .status {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-confirmed {
      background-color: #28a745;
    }

    .status-pending {
      background-color: #ffc107;
      color: #212529;
    }

    .status-cancelled {
      background-color: #dc3545;
    }

    .card-body {
      padding: 20px;
    }

    .description {
      color: #666;
      margin-bottom: 15px;
      line-height: 1.5;
    }

    .details {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #555;
    }

    .icon-calendar::before { content: '📅'; }
    .icon-clock::before { content: '🕐'; }
    .icon-location::before { content: '📍'; }

    .card-actions {
      padding: 15px 20px;
      background-color: #f8f9fa;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }

    .btn {
      display: inline-block;
      padding: 8px 16px;
      text-decoration: none;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s;
    }

    .btn-primary {
      background-color: #667eea;
      color: white;
    }

    .btn-primary:hover {
      background-color: #5568d3;
    }

    .btn-info {
      background-color: #17a2b8;
      color: white;
    }

    .btn-warning {
      background-color: #ffc107;
      color: #212529;
    }

    .btn-danger {
      background-color: #dc3545;
      color: white;
    }

    .btn-sm {
      padding: 6px 12px;
      font-size: 12px;
    }

    .no-appointments {
      text-align: center;
      padding: 50px 20px;
      color: #666;
    }

    .no-appointments p {
      font-size: 1.2rem;
      margin-bottom: 20px;
    }
  `]
})
export class AppointmentListComponent implements OnInit {
  upcomingAppointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.upcomingAppointments = this.appointmentService.getUpcomingAppointments();
  }

  deleteAppointment(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous ?')) {
      this.appointmentService.deleteAppointment(id);
      this.loadAppointments();
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'confirmed': return 'Confirmé';
      case 'pending': return 'En attente';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}