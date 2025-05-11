import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService, User } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'api/users';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  updateProfile(userData: Partial<User>): Observable<User> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      return throwError(() => new Error('用户未登录'));
    }

    return this.http.patch<User>(`${this.apiUrl}/${currentUser.id}`, userData).pipe(
      catchError(error => {
        console.error('更新用户资料失败:', error);
        return throwError(() => new Error('更新资料失败，请稍后重试'));
      })
    );
  }

  getUserPreferences(): Observable<any> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      return throwError(() => new Error('用户未登录'));
    }

    return this.http.get(`${this.apiUrl}/${currentUser.id}/preferences`).pipe(
      catchError(error => {
        console.error('获取用户偏好设置失败:', error);
        return throwError(() => new Error('获取偏好设置失败，请稍后重试'));
      })
    );
  }
} 