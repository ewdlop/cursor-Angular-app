import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  attachment?: File;
}

export interface SubjectOption {
  value: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // 这里替换为实际的API端点
  private apiUrl = 'api/contact';

  subjectOptions: SubjectOption[] = [
    { value: 'general', label: '一般咨询' },
    { value: 'support', label: '技术支持' },
    { value: 'feedback', label: '意见反馈' },
    { value: 'other', label: '其他' }
  ];

  constructor(private http: HttpClient) { }

  submitForm(formData: ContactFormData): Observable<any> {
    // 创建FormData对象以支持文件上传
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('subject', formData.subject);
    formDataToSend.append('message', formData.message);
    if (formData.attachment) {
      formDataToSend.append('attachment', formData.attachment);
    }

    // 模拟API调用
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({ success: true, message: '消息已发送' });
        observer.complete();
      }, 1000);
    }).pipe(
      catchError(error => {
        console.error('提交表单时出错:', error);
        return throwError(() => new Error('提交失败，请稍后重试'));
      })
    );
  }

  // 实际API调用（当后端准备好时使用）
  /*
  submitForm(formData: ContactFormData): Observable<any> {
    return this.http.post(this.apiUrl, formData).pipe(
      catchError(error => {
        console.error('提交表单时出错:', error);
        return throwError(() => new Error('提交失败，请稍后重试'));
      })
    );
  }
  */
}
