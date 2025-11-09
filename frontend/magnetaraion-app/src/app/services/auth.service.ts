import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject, tap, catchError, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.verifyToken();
  }

  login(credentials: {username: string, password: string}): Observable<any> {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    return this.apiService.post('/token', formData).pipe(
      tap((response: any) => {
        localStorage.setItem('auth_token', response.access_token);
        this.isAuthenticatedSubject.next(true);
        this.getUser().subscribe();
      })
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    // Optional: Inform the backend about logout
    this.apiService.post('/logout', {}).subscribe();
  }

  register(userInfo: any): Observable<any> {
    return this.apiService.post('/users/', userInfo);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getUser(): Observable<User | null> {
    return this.apiService.get<User>('/users/me').pipe(
      tap(user => {
        this.currentUserSubject.next(user);
      }),
      catchError(() => {
        this.logout();
        return of(null);
      })
    );
  }

  verifyToken() {
    if (this.getToken()) {
      this.isAuthenticatedSubject.next(true);
      this.getUser().subscribe();
    } else {
      this.isAuthenticatedSubject.next(false);
      this.currentUserSubject.next(null);
    }
  }

  checkSetupNeeded(): Observable<{setup_needed: boolean}> {
    return this.apiService.get('/setup_check');
  }
}
