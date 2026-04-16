import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private readonly STORAGE_KEY = 'appointments';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.initializeSampleData();
  }

  private initializeSampleData(): void {
    if (!this.isBrowser) return;

    if (!localStorage.getItem(this.STORAGE_KEY)) {
      const sampleAppointments: Appointment[] = [
        {
          id: 1,
          title: 'Réunion équipe',
          description: 'Réunion hebdomadaire de l\'équipe de développement',
          date: '2026-04-20',
          time: '10:00',
          location: 'Salle de conférence A',
          status: 'confirmed'
        },
        {
          id: 2,
          title: 'Rendez-vous client',
          description: 'Présentation du nouveau projet',
          date: '2026-04-22',
          time: '14:30',
          location: 'Bureau client',
          status: 'pending'
        }
      ];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sampleAppointments));
    }
  }

  getAppointments(): Appointment[] {
    if (!this.isBrowser) return [];
    const appointments = localStorage.getItem(this.STORAGE_KEY);
    return appointments ? JSON.parse(appointments) : [];
  }

  getAppointment(id: number): Appointment | undefined {
    if (!this.isBrowser) return undefined;
    const appointments = this.getAppointments();
    return appointments.find(appointment => appointment.id === id);
  }

  createAppointment(appointment: Omit<Appointment, 'id'>): Appointment {
    if (!this.isBrowser) {
      throw new Error('Cannot create appointment on server side');
    }
    const appointments = this.getAppointments();
    const newId = appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1;
    const newAppointment: Appointment = { ...appointment, id: newId };
    appointments.push(newAppointment);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(appointments));
    return newAppointment;
  }

  updateAppointment(id: number, appointment: Partial<Appointment>): Appointment | null {
    if (!this.isBrowser) return null;
    const appointments = this.getAppointments();
    const index = appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      appointments[index] = { ...appointments[index], ...appointment };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(appointments));
      return appointments[index];
    }
    return null;
  }

  deleteAppointment(id: number): boolean {
    if (!this.isBrowser) return false;
    const appointments = this.getAppointments();
    const filteredAppointments = appointments.filter(a => a.id !== id);
    if (filteredAppointments.length < appointments.length) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredAppointments));
      return true;
    }
    return false;
  }

  getUpcomingAppointments(): Appointment[] {
    const appointments = this.getAppointments();
    const now = new Date();
    return appointments
      .filter(appointment => {
        const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
        return appointmentDate > now && appointment.status !== 'cancelled';
      })
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA.getTime() - dateB.getTime();
      });
  }
}