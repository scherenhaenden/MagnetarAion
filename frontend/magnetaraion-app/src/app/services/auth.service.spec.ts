import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { firstValueFrom } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let apiUrl: string;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, ApiService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    apiUrl = environment.apiUrl;
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null when no token is in localStorage', () => {
    expect(service.getToken()).toBeNull();
  });

  it('should return the token when it is in localStorage', () => {
    const testToken = 'test-token-123';
    localStorage.setItem('auth_token', testToken);
    expect(service.getToken()).toBe(testToken);
  });

  it('should login, store token, and fetch user', async () => {
    const credentials = { username: 'test', password: 'password' };
    const mockResponse = { access_token: 'test-token', token_type: 'bearer' };
    const mockUser: User = { id: 1, username: 'test', email: 'test@example.com', is_active: true };

    service.login(credentials).subscribe();

    const reqLogin = httpMock.expectOne(`${apiUrl}/token`);
    reqLogin.flush(mockResponse);

    const reqUser = httpMock.expectOne(`${apiUrl}/users/me`);
    reqUser.flush(mockUser);

    const user = await firstValueFrom(service.currentUser$);
    expect(localStorage.getItem('auth_token')).toBe(mockResponse.access_token);
    expect(user).toEqual(mockUser);
  });

  it('should send a POST request to /users/ on register', () => {
    const userInfo = { username: 'test', password: 'password', email: 'test@example.com' };
    const mockUser: User = { id: 1, ...userInfo, is_active: true };

    service.register(userInfo).subscribe(response => {
      expect(response).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${apiUrl}/users/`);
    req.flush(mockUser);
  });

  it('should remove token and user on logout', () => {
    localStorage.setItem('auth_token', 'test-token');

    let isAuthenticated!: boolean;
    service.isAuthenticated$.subscribe(status => isAuthenticated = status);

    service.logout();

    const reqLogout = httpMock.expectOne(`${apiUrl}/logout`);
    reqLogout.flush({});

    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(isAuthenticated).toBeFalse();
  });

  it('should handle verifyToken on initialization when token exists', async () => {
    localStorage.setItem('auth_token', 'test-token');
    const mockUser: User = { id: 1, username: 'test', email: 'test@example.com', is_active: true };

    // Simulate re-initialization by creating a new instance of the service
    service = new AuthService(TestBed.inject(ApiService));

    const reqUser = httpMock.expectOne(`${apiUrl}/users/me`);
    reqUser.flush(mockUser);

    const user = await firstValueFrom(service.currentUser$);
    expect(user).toEqual(mockUser);
  });
});
