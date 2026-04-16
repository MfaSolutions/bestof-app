import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>{{ isEdit ? 'Modifier' : 'Ajouter' }} un Utilisateur</h2>
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="user-form">
        <div class="form-group">
          <label for="name">Nom:</label>
          <input type="text" id="name" formControlName="name" class="form-control">
          <div *ngIf="userForm.get('name')?.invalid && userForm.get('name')?.touched" class="error">
            Le nom est requis.
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" formControlName="email" class="form-control">
          <div *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched" class="error">
            Un email valide est requis.
          </div>
        </div>

        <div class="form-group">
          <label for="phone">Téléphone:</label>
          <input type="tel" id="phone" formControlName="phone" class="form-control">
        </div>

        <div class="actions">
          <button type="submit" [disabled]="userForm.invalid" class="btn btn-primary">
            {{ isEdit ? 'Modifier' : 'Ajouter' }}
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
    .user-form {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    .form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }
    .error {
      color: #dc3545;
      font-size: 12px;
      margin-top: 5px;
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
    .btn-primary {
      background-color: #007bff;
      color: white;
    }
    .btn-primary:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }
  `]
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEdit = false;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userId = +params['id'];
        this.isEdit = true;
        this.loadUser(this.userId);
      }
    });
  }

  loadUser(id: number) {
    const user = this.userService.getUser(id);
    if (user) {
      this.userForm.patchValue(user);
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;

      if (this.isEdit && this.userId) {
        this.userService.updateUser(this.userId, userData);
      } else {
        this.userService.createUser(userData);
      }

      this.router.navigate(['/users']);
    }
  }

  onCancel() {
    this.router.navigate(['/users']);
  }
}