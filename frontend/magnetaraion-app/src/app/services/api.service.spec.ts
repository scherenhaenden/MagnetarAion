import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle GET requests', () => {
    const testData = { message: 'test' };
    const testUrl = '/test';

    service.get(testUrl).subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}${testUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should handle POST requests', () => {
    const testData = { message: 'test' };
    const testUrl = '/test';
    const testBody = { data: 'test' };

    service.post(testUrl, testBody).subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}${testUrl}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(testBody);
    req.flush(testData);
  });

  it('should handle PUT requests', () => {
    const testData = { message: 'test' };
    const testUrl = '/test';
    const testBody = { data: 'test' };

    service.put(testUrl, testBody).subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}${testUrl}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(testBody);
    req.flush(testData);
  });

  it('should handle DELETE requests', () => {
    const testData = { message: 'test' };
    const testUrl = '/test';

    service.delete(testUrl).subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}${testUrl}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(testData);
  });

  it('should handle errors', () => {
    const testUrl = '/test';
    const errorMessage = 'test error';

    service.get(testUrl).subscribe({
      next: () => fail('should have failed'),
      error: (error: Error) => {
        expect(error).toBeTruthy();
      },
    });

    const req = httpMock.expectOne(`${service['apiUrl']}${testUrl}`);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
