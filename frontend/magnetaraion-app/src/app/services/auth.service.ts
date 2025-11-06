import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) { }

  login(credentials: {username: string, password: string}): Observable<any> {
    return this.apiService.post('/token', credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('auth_token', response.access_token);
      })
    );
  }

  register(userInfo: any): Observable<any> {
    return this.apiService.post('/users/', userInfo);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
