import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api'; // 替换为实际的API地址
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // 从localStorage恢复用户会话
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  register(data: RegisterData): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/register`, data).pipe(
      tap(user => {
        this.setCurrentUser(user);
      })
    );
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap(user => {
        this.setCurrentUser(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  updateProfile(userData: Partial<User>): Observable<User> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return throwError(() => new Error('用户未登录'));
    }

    return this.http.patch<User>(`${this.apiUrl}/users/${currentUser.id}`, userData).pipe(
      catchError((error: any) => {
        console.error('更新用户资料失败:', error);
        return throwError(() => error);
      })
    );
  }

  getUserPreferences(): Observable<any> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return throwError(() => new Error('用户未登录'));
    }

    return this.http.get(`${this.apiUrl}/users/${currentUser.id}/preferences`).pipe(
      catchError((error: any) => {
        console.error('获取用户偏好设置失败:', error);
        return throwError(() => error);
      })
    );
  }
} 