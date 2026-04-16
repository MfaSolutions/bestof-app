import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container" *ngIf="user">
      <h2>Détails de l'Utilisateur</h2>
      <div class="user-detail">
        <div class="detail-item">
          <strong>ID:</strong> {{ user.id }}
        </div>
        <div class="detail-item">
          <strong>Nom:</strong> {{ user.name }}
        </div>
        <div class="detail-item">
          <strong>Email:</strong> {{ user.email }}
        </div>
        <div class="detail-item">
          <strong>Téléphone:</strong> {{ user.phone || '-' }}
        </div>
      </div>
      <div class="actions">
        <a [routerLink]="['/users', user.id, 'edit']" class="btn btn-warning">Modifier</a>
        <a routerLink="/users" class="btn btn-secondary">Retour à la liste</a>
      </div>
    </div>
    <div class="container" *ngIf="!user">
      <p>Utilisateur non trouvé.</p>
      <a routerLink="/users" class="btn btn-secondary">Retour à la liste</a>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .user-detail {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .detail-item {
      margin-bottom: 10px;
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }
    .detail-item:last-child {
      border-bottom: none;
    }
    .actions {
      margin-top: 20px;
    }
    .btn {
      display: inline-block;
      padding: 10px 20px;
      margin-right: 10px;
      text-decoration: none;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    .btn-warning {
      background-color: #ffc107;
      color: black;
    }
    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }
  `]
})
export class UserDetailComponent implements OnInit {
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.user = this.userService.getUser(id);
    });
  }
}