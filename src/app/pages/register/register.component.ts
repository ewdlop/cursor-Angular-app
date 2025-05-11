import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  formErrors = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  validateForm(): boolean {
    let isValid = true;
    this.formErrors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
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

    if (!this.formData.password) {
      this.formErrors.password = '请输入密码';
      isValid = false;
    } else if (this.formData.password.length < 6) {
      this.formErrors.password = '密码长度至少为6个字符';
      isValid = false;
    }

    if (!this.formData.confirmPassword) {
      this.formErrors.confirmPassword = '请确认密码';
      isValid = false;
    } else if (this.formData.password !== this.formData.confirmPassword) {
      this.formErrors.confirmPassword = '两次输入的密码不一致';
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

      const { confirmPassword, ...registerData } = this.formData;

      this.userService.register(registerData).subscribe({
        next: () => {
          this.submitSuccess = true;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error) => {
          this.submitError = error.error?.message || '注册失败，请稍后重试';
          this.isSubmitting = false;
        }
      });
    }
  }
} 