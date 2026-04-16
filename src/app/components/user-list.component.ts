import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2>Liste des Utilisateurs</h2>
      <div class="actions">
        <a routerLink="/users/new" class="btn btn-primary">Ajouter un Utilisateur</a>
      </div>
      <div class="user-list">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone || '-' }}</td>
              <td>
                <a [routerLink]="['/users', user.id]" class="btn btn-sm btn-info">Voir</a>
                <a [routerLink]="['/users', user.id, 'edit']" class="btn btn-sm btn-warning">Modifier</a>
                <button (click)="deleteUser(user.id)" class="btn btn-sm btn-danger">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p *ngIf="users.length === 0" class="no-users">Aucun utilisateur trouvé.</p>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .actions {
      margin-bottom: 20px;
    }
    .btn {
      display: inline-block;
      padding: 8px 16px;
      margin: 0 5px 5px 0;
      text-decoration: none;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    .btn-primary {
      background-color: #007bff;
      color: white;
    }
    .btn-info {
      background-color: #17a2b8;
      color: white;
    }
    .btn-warning {
      background-color: #ffc107;
      color: black;
    }
    .btn-danger {
      background-color: #dc3545;
      color: white;
    }
    .btn-sm {
      padding: 4px 8px;
      font-size: 12px;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    .table th, .table td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }
    .table th {
      background-color: #f2f2f2;
    }
    .no-users {
      text-align: center;
      color: #666;
      font-style: italic;
    }
  `]
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.userService.getUsers();
  }

  deleteUser(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(id);
      this.loadUsers();
    }
  }
}