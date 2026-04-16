export interface Appointment {
  id: number;
  title: string;
  description?: string;
  date: string;
  time: string;
  location?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}