import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService, ContactFormData, SubjectOption } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactInfo = {
    address: '北京市朝阳区科技园区88号',
    phone: '+86 10 8888 8888',
    email: 'contact@example.com',
    hours: '周一至周五: 9:00 - 18:00'
  };

  formData: ContactFormData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  formErrors = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  submitSuccess = false;
  submitError = '';
  selectedFile: File | null = null;
  fileName = '';
  subjectOptions: SubjectOption[];

  constructor(private contactService: ContactService) {
    this.subjectOptions = contactService.subjectOptions;
  }

  validateForm(): boolean {
    let isValid = true;
    this.formErrors = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };

    if (!this.formData.name.trim()) {
      this.formErrors.name = '请输入您的姓名';
      isValid = false;
    }

    if (!this.formData.email.trim()) {
      this.formErrors.email = '请输入您的邮箱';
      isValid = false;
    } else if (!this.validateEmail(this.formData.email)) {
      this.formErrors.email = '请输入有效的邮箱地址';
      isValid = false;
    }

    if (!this.formData.subject) {
      this.formErrors.subject = '请选择主题';
      isValid = false;
    }

    if (!this.formData.message.trim()) {
      this.formErrors.message = '请输入您的消息';
      isValid = false;
    } else if (this.formData.message.length < 10) {
      this.formErrors.message = '消息内容至少需要10个字符';
      isValid = false;
    }

    return isValid;
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileName = this.selectedFile.name;
      this.formData.attachment = this.selectedFile;
    }
  }

  removeFile(): void {
    this.selectedFile = null;
    this.fileName = '';
    this.formData.attachment = undefined;
  }

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    this.formErrors = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    this.selectedFile = null;
    this.fileName = '';
    this.submitSuccess = false;
    this.submitError = '';
  }

  onSubmit() {
    if (this.validateForm()) {
      this.isSubmitting = true;
      this.submitError = '';
      this.submitSuccess = false;

      this.contactService.submitForm(this.formData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.submitSuccess = true;
          this.resetForm();
        },
        error: (error) => {
          this.isSubmitting = false;
          this.submitError = error.message || '提交失败，请稍后重试';
        }
      });
    }
  }
}
