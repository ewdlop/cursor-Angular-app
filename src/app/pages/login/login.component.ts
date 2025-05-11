import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formData = {
    email: '',
    password: ''
  };

  formErrors = {
    email: '',
    password: ''
  };

  isSubmitting = false;
  submitError = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  validateForm(): boolean {
    let isValid = true;
    this.formErrors = {
      email: '',
      password: ''
    };

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

      this.userService.login(this.formData.email, this.formData.password).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.submitError = error.error?.message || '登录失败，请检查邮箱和密码';
          this.isSubmitting = false;
        }
      });
    }
  }
} 