import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Clean up after each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve token', () => {
    const testToken = 'test-token-123';
    service.setToken(testToken);
    expect(service.getToken()).toBe(testToken);
  });

  it('should return null when no token exists', () => {
    expect(service.getToken()).toBeNull();
  });

  it('should remove token on logout', () => {
    const testToken = 'test-token-123';
    service.setToken(testToken);
    expect(service.getToken()).toBe(testToken);

    service.removeToken();
    expect(service.getToken()).toBeNull();
  });

  it('should return true for isAuthenticated when token exists', () => {
    service.setToken('test-token');
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should return false for isAuthenticated when no token exists', () => {
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should emit auth state changes', (done) => {
    service.getAuthState().subscribe(state => {
      expect(state).toBe(false);
      done();
    });
  });

  it('should update auth state when token is set', (done) => {
    let callCount = 0;
    service.getAuthState().subscribe(state => {
      callCount++;
      if (callCount === 2) {
        expect(state).toBe(true);
        done();
      }
    });

    service.setToken('test-token');
  });

  it('should call removeToken on logout', () => {
    spyOn(service, 'removeToken');
    service.logout();
    expect(service.removeToken).toHaveBeenCalled();
  });
});

