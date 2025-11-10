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

  public login(credentials: {username: string, password: string}): Observable<{ access_token: string, token_type: string }> {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    return this.apiService.post<{ access_token: string, token_type: string }, FormData>('/token', formData).pipe(
      tap((response: { access_token: string, token_type: string }) => {
        localStorage.setItem('auth_token', response.access_token);
        this.isAuthenticatedSubject.next(true);
        this.getUser().subscribe();
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('auth_token');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    // Optional: Inform the backend about logout
    this.apiService.post('/logout', {}).subscribe();
  }

  public register(userInfo: unknown): Observable<User> {
    return this.apiService.post<User, unknown>('/users/', userInfo);
  }

  public getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  public getUser(): Observable<User | null> {
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

  public verifyToken(): void {
    if (this.getToken()) {
      this.isAuthenticatedSubject.next(true);
      this.getUser().subscribe();
    } else {
      this.isAuthenticatedSubject.next(false);
      this.currentUserSubject.next(null);
    }
  }

  public checkSetupNeeded(): Observable<{setup_needed: boolean}> {
    return this.apiService.get('/setup_check');
  }
}
