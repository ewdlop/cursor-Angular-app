import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile-container">
      <h2>用户资料</h2>
      
      <div *ngIf="currentUser; else notLoggedIn">
        <div class="profile-info">
          <p><strong>用户名：</strong> {{ currentUser.username }}</p>
          <p><strong>邮箱：</strong> {{ currentUser.email }}</p>
        </div>

        <form (ngSubmit)="onSubmit()" #profileForm="ngForm">
          <div class="form-group">
            <label for="username">用户名</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              [(ngModel)]="userData.username" 
              required>
          </div>

          <div class="form-group">
            <label for="email">邮箱</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              [(ngModel)]="userData.email" 
              required>
          </div>

          <button type="submit" [disabled]="!profileForm.form.valid">
            更新资料
          </button>
        </form>

        <button (click)="logout()" class="logout-btn">
          退出登录
        </button>
      </div>

      <ng-template #notLoggedIn>
        <p>请先登录</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 1rem;
    }

    .profile-info {
      margin-bottom: 2rem;
      padding: 1rem;
      background-color: #f5f5f5;
      border-radius: 4px;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
    }

    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    button {
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:disabled {
      background-color: #ccc;
    }

    .logout-btn {
      margin-top: 1rem;
      background-color: #dc3545;
    }
  `]
})
export class UserProfileComponent implements OnInit {
  currentUser: User | null = null;
  userData: Partial<User> = {};

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // 订阅用户状态变化
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.userData = { ...user };
      }
    });
  }

  onSubmit() {
    if (this.userData) {
      this.userService.updateProfile(this.userData).subscribe({
        next: (updatedUser) => {
          console.log('资料更新成功:', updatedUser);
          // 更新本地用户数据
          this.currentUser = updatedUser;
        },
        error: (error) => {
          console.error('更新失败:', error);
        }
      });
    }
  }

  logout() {
    this.authService.logout();
  }
} 