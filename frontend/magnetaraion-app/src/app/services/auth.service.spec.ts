import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let apiUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, ApiService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    apiUrl = environment.apiUrl;
    localStorage.clear();
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

  it('should send a POST request to /token on login', () => {
    const credentials = { username: 'test', password: 'password' };
    const mockResponse = { access_token: 'test-token' };

    service.login(credentials).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/token`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should store the token in localStorage on successful login', () => {
    const credentials = { username: 'test', password: 'password' };
    const mockResponse = { access_token: 'test-token' };

    service.login(credentials).subscribe(() => {
      expect(localStorage.getItem('auth_token')).toBe('test-token');
    });

    const req = httpMock.expectOne(`${apiUrl}/token`);
    req.flush(mockResponse);
  });

  it('should send a POST request to /users/ on register', () => {
    const userInfo = { username: 'test', password: 'password', email: 'test@example.com' };

    service.register(userInfo).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/users/`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
