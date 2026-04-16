import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Appointment } from '../models/appointment.model';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>{{ isEdit ? 'Modifier' : 'Nouveau' }} Rendez-vous</h2>

      <form [formGroup]="appointmentForm" (ngSubmit)="onSubmit()" class="appointment-form">
        <div class="form-row">
          <div class="form-group">
            <label for="title">Titre *</label>
            <input type="text" id="title" formControlName="title" class="form-control">
            <div *ngIf="appointmentForm.get('title')?.invalid && appointmentForm.get('title')?.touched" class="error">
              Le titre est requis.
            </div>
          </div>

          <div class="form-group">
            <label for="status">Statut</label>
            <select id="status" formControlName="status" class="form-control">
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmé</option>
              <option value="cancelled">Annulé</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" formControlName="description" class="form-control" rows="3"></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="date">Date *</label>
            <input type="date" id="date" formControlName="date" class="form-control">
            <div *ngIf="appointmentForm.get('date')?.invalid && appointmentForm.get('date')?.touched" class="error">
              La date est requise.
            </div>
          </div>

          <div class="form-group">
            <label for="time">Heure *</label>
            <input type="time" id="time" formControlName="time" class="form-control">
            <div *ngIf="appointmentForm.get('time')?.invalid && appointmentForm.get('time')?.touched" class="error">
              L'heure est requise.
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="location">Lieu</label>
          <input type="text" id="location" formControlName="location" class="form-control" placeholder="Salle de réunion, adresse, etc.">
        </div>

        <div class="actions">
          <button type="submit" [disabled]="appointmentForm.invalid" class="btn btn-primary">
            {{ isEdit ? 'Modifier' : 'Créer' }} le Rendez-vous
          </button>
          <button type="button" (click)="onCancel()" class="btn btn-secondary">Annuler</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }

    h2 {
      text-align: center;
      margin-bottom: 30px;
      color: #333;
    }

    .appointment-form {
      background: #f9f9f9;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .form-row {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
    }

    .form-row .form-group {
      flex: 1;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #333;
    }

    .form-control {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      transition: border-color 0.3s;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    textarea.form-control {
      resize: vertical;
      min-height: 80px;
    }

    .error {
      color: #dc3545;
      font-size: 12px;
      margin-top: 5px;
    }

    .actions {
      margin-top: 30px;
      display: flex;
      gap: 15px;
      justify-content: center;
    }

    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      transition: background-color 0.3s;
      min-width: 140px;
    }

    .btn-primary {
      background-color: #667eea;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #5568d3;
    }

    .btn-primary:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background-color: #545b62;
    }

    @media (max-width: 768px) {
      .form-row {
        flex-direction: column;
        gap: 0;
      }

      .actions {
        flex-direction: column;
        align-items: center;
      }

      .btn {
        width: 100%;
        max-width: 200px;
      }
    }
  `]
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm: FormGroup;
  isEdit = false;
  appointmentId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.appointmentForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: [''],
      status: ['pending']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.appointmentId = +params['id'];
        this.isEdit = true;
        this.loadAppointment(this.appointmentId);
      }
    });
  }

  loadAppointment(id: number) {
    const appointment = this.appointmentService.getAppointment(id);
    if (appointment) {
      this.appointmentForm.patchValue(appointment);
    }
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const appointmentData = this.appointmentForm.value;

      if (this.isEdit && this.appointmentId) {
        this.appointmentService.updateAppointment(this.appointmentId, appointmentData);
      } else {
        this.appointmentService.createAppointment(appointmentData);
      }

      this.router.navigate(['/appointments']);
    }
  }

  onCancel() {
    this.router.navigate(['/appointments']);
  }
}