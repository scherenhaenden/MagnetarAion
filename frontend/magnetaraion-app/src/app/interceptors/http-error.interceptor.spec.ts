import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { httpErrorInterceptor } from '../interceptors/http-error.interceptor';

describe('httpErrorInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([httpErrorInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should catch and log an error', () => {
    const testUrl = '/test';
    const errorMessage = 'test error';

    httpClient.get(testUrl).subscribe({
      next: () => fail('should have failed'),
      error: (error: Error) => {
        expect(error).toBeTruthy();
      },
    });

    const req = httpMock.expectOne(testUrl);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
