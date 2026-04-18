import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { UserListComponent } from './components/user-list.component';
import { UserFormComponent } from './components/user-form.component';
import { UserDetailComponent } from './components/user-detail.component';
import { LoginComponent } from './components/login.component';
import { AppointmentListComponent } from './components/appointment-list.component';
import { AppointmentFormComponent } from './components/appointment-form.component';
import { WeatherComponent } from './components/weather.component';
import { QuizComponent } from './components/quiz.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserListComponent, canActivate: [authGuard] },
  { path: 'users/new', component: UserFormComponent, canActivate: [authGuard] },
  { path: 'users/:id', component: UserDetailComponent, canActivate: [authGuard] },
  { path: 'users/:id/edit', component: UserFormComponent, canActivate: [authGuard] },
  { path: 'appointments', component: AppointmentListComponent, canActivate: [authGuard] },
  { path: 'appointments/new', component: AppointmentFormComponent, canActivate: [authGuard] },
  { path: 'appointments/:id', component: AppointmentFormComponent, canActivate: [authGuard] },
  { path: 'appointments/:id/edit', component: AppointmentFormComponent, canActivate: [authGuard] },
  { path: 'weather', component: WeatherComponent, canActivate: [authGuard] },
  { path: 'quiz', component: QuizComponent }
];
