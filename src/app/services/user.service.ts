import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly STORAGE_KEY = 'users';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // Initialize with some sample data if empty (only in browser)
    if (this.isBrowser && !localStorage.getItem(this.STORAGE_KEY)) {
      const sampleUsers: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' }
      ];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sampleUsers));
    }
  }

  getUsers(): User[] {
    if (!this.isBrowser) {
      return [];
    }
    const users = localStorage.getItem(this.STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  }

  getUser(id: number): User | undefined {
    if (!this.isBrowser) {
      return undefined;
    }
    const users = this.getUsers();
    return users.find(user => user.id === id);
  }

  createUser(user: Omit<User, 'id'>): User {
    if (!this.isBrowser) {
      throw new Error('Cannot create user on server side');
    }
    const users = this.getUsers();
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser: User = { ...user, id: newId };
    users.push(newUser);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    return newUser;
  }

  updateUser(id: number, user: Partial<User>): User | null {
    if (!this.isBrowser) {
      return null;
    }
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...user };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
      return users[index];
    }
    return null;
  }

  deleteUser(id: number): boolean {
    if (!this.isBrowser) {
      return false;
    }
    const users = this.getUsers();
    const filteredUsers = users.filter(u => u.id !== id);
    if (filteredUsers.length < users.length) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredUsers));
      return true;
    }
    return false;
  }
}