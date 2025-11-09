import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { httpTokenInterceptor } from '../interceptors/http-token.interceptor';

describe('httpTokenInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([httpTokenInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.removeItem('auth_token');
  });

  it('should add an Authorization header', () => {
    const testUrl = '/test';
    const testToken = 'test-token';
    localStorage.setItem('auth_token', testToken);

    httpClient.get(testUrl).subscribe();

    const req = httpMock.expectOne(testUrl);
    expect(req.request.headers.has('Authorization')).toBeTruthy();
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${testToken}`);
    req.flush({});
  });

  it('should not add an Authorization header if no token is present', () => {
    const testUrl = '/test';

    httpClient.get(testUrl).subscribe();

    const req = httpMock.expectOne(testUrl);
    expect(req.request.headers.has('Authorization')).toBeFalsy();
    req.flush({});
  });
});
