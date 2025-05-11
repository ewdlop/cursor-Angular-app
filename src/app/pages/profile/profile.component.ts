import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isEditing = false;
  formData = {
    username: '',
    email: ''
  };
  formErrors = {
    username: '',
    email: ''
  };
  isSubmitting = false;
  submitError = '';
  submitSuccess = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    // 检查用户是否已登录
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    // 获取当前用户数据
    this.user = this.userService.getCurrentUser();
    if (this.user) {
      this.formData = {
        username: this.user.username,
        email: this.user.email
      };
    } else {
      // 如果没有获取到用户数据，重定向到登录页面
      this.router.navigate(['/login']);
    }
  }

  validateForm(): boolean {
    let isValid = true;
    this.formErrors = {
      username: '',
      email: ''
    };

    if (!this.formData.username.trim()) {
      this.formErrors.username = '请输入用户名';
      isValid = false;
    }

    if (!this.formData.email.trim()) {
      this.formErrors.email = '请输入邮箱';
      isValid = false;
    } else if (!this.validateEmail(this.formData.email)) {
      this.formErrors.email = '请输入有效的邮箱地址';
      isValid = false;
    }

    return isValid;
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  onSubmit() {
    if (this.validateForm()) {
      this.isSubmitting = true;
      this.submitError = '';
      this.submitSuccess = false;

      this.userService.updateProfile(this.formData).subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          this.isEditing = false;
          this.submitSuccess = true;
          this.isSubmitting = false;
        },
        error: (error) => {
          this.submitError = error.error?.message || '更新失败，请稍后重试';
          this.isSubmitting = false;
        }
      });
    }
  }

  startEditing() {
    this.isEditing = true;
    this.submitError = '';
    this.submitSuccess = false;
  }

  cancelEditing() {
    this.isEditing = false;
    if (this.user) {
      this.formData = {
        username: this.user.username,
        email: this.user.email
      };
    }
    this.submitError = '';
    this.submitSuccess = false;
  }
} 