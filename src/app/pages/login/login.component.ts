import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, LoginCredentials } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-container">
      <div class="login-box">
        <h2>登录</h2>
        
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="form-group">
            <label for="email">邮箱</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              [(ngModel)]="credentials.email" 
              required 
              email
              #email="ngModel">
            <div class="error-message" *ngIf="email.invalid && (email.dirty || email.touched)">
              <span *ngIf="email.errors?.['required']">请输入邮箱</span>
              <span *ngIf="email.errors?.['email']">请输入有效的邮箱地址</span>
            </div>
          </div>

          <div class="form-group">
            <label for="password">密码</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              [(ngModel)]="credentials.password" 
              required
              minlength="6"
              #password="ngModel">
            <div class="error-message" *ngIf="password.invalid && (password.dirty || password.touched)">
              <span *ngIf="password.errors?.['required']">请输入密码</span>
              <span *ngIf="password.errors?.['minlength']">密码至少需要6个字符</span>
            </div>
          </div>

          <div class="error-message" *ngIf="loginError">
            {{ loginError }}
          </div>

          <button 
            type="submit" 
            [disabled]="!loginForm.form.valid || isLoading">
            {{ isLoading ? '登录中...' : '登录' }}
          </button>

          <div class="register-link">
            还没有账号？<a routerLink="/register">立即注册</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 200px);
      padding: 2rem;
    }

    .login-box {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }

    h2 {
      text-align: center;
      color: #2c3e50;
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #2c3e50;
    }

    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s;

      &:focus {
        outline: none;
        border-color: #3498db;
      }
    }

    .error-message {
      color: #e74c3c;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover:not(:disabled) {
        background-color: #2980b9;
      }

      &:disabled {
        background-color: #bdc3c7;
        cursor: not-allowed;
      }
    }

    .register-link {
      text-align: center;
      margin-top: 1rem;
      color: #7f8c8d;

      a {
        color: #3498db;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  `]
})
export class LoginComponent {
  credentials: LoginCredentials = {
    email: '',
    password: ''
  };
  isLoading = false;
  loginError = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.loginError = '';

    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        this.loginError = error.message || '登录失败，请稍后重试';
        this.isLoading = false;
      }
    });
  }
} 