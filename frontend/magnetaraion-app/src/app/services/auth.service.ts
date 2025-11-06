import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

/**
 * **AuthService**
 *
 * Handles authentication logic including token management,
 * user login/logout, and authentication state.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private authState$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor() {}

  /**
   * Get the current authentication token
   * @returns The authentication token or null if not authenticated
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Set the authentication token
   * @param token - The authentication token to store
   */
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.authState$.next(true);
  }

  /**
   * Remove the authentication token (logout)
   */
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.authState$.next(false);
  }

  /**
   * Check if user is authenticated
   * @returns true if token exists, false otherwise
   */
  isAuthenticated(): boolean {
    return this.hasToken();
  }

  /**
   * Get authentication state as observable
   * @returns Observable of authentication state
   */
  getAuthState(): Observable<boolean> {
    return this.authState$.asObservable();
  }

  /**
   * Private helper to check if token exists
   */
  private hasToken(): boolean {
    return !!this.getToken();
  }

  /**
   * Login user (to be implemented with actual API call)
   * @param username - User's username
   * @param password - User's password
   */
  login(username: string, password: string): Observable<any> {
    // TODO: Implement actual login logic with API call
    throw new Error('Login not yet implemented');
  }

  /**
   * Logout user
   */
  logout(): void {
    this.removeToken();
  }
}
/**
 * Issue Model
 *
 * Represents an issue/ticket in the system.
 */
export interface Issue {
  id: number;
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  assignee?: string;
  reporter?: string;
  created_at?: string;
  updated_at?: string;
  project_id?: number;
  [key: string]: any; // Allow additional properties
}

