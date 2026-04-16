import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { signal } from '@angular/core';
import { AuthUser, Credentials } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_STORAGE_KEY = 'auth_user';
  private readonly USERS_STORAGE_KEY = 'auth_users';
  private isBrowser: boolean;
  
  isAuthenticated = signal<boolean>(false);
  currentUser = signal<AuthUser | null>(null);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.initializeUsers();
    this.checkSession();
  }

  private initializeUsers(): void {
    if (!this.isBrowser) return;
    
    if (!localStorage.getItem(this.USERS_STORAGE_KEY)) {
      const defaultUsers = [
        { id: 1, username: 'admin', password: 'admin123', email: 'admin@example.com' },
        { id: 2, username: 'user', password: 'user123', email: 'user@example.com' }
      ];
      localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
    }
  }

  private checkSession(): void {
    if (!this.isBrowser) return;
    
    const user = localStorage.getItem(this.AUTH_STORAGE_KEY);
    if (user) {
      this.currentUser.set(JSON.parse(user));
      this.isAuthenticated.set(true);
    }
  }

  login(credentials: Credentials): boolean {
    if (!this.isBrowser) return false;

    const users = this.getStoredUsers();
    const user = users.find(u => u.username === credentials.username && u.password === credentials.password);

    if (user) {
      const authUser: AuthUser = {
        id: user.id,
        username: user.username,
        email: user.email
      };
      localStorage.setItem(this.AUTH_STORAGE_KEY, JSON.stringify(authUser));
      this.currentUser.set(authUser);
      this.isAuthenticated.set(true);
      return true;
    }

    return false;
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.AUTH_STORAGE_KEY);
    }
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  private getStoredUsers(): any[] {
    if (!this.isBrowser) return [];
    const users = localStorage.getItem(this.USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUser();
  }
}