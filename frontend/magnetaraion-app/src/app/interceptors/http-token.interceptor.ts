import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Intercepts HTTP requests to add an Authorization token if available.
 */
export const httpTokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Get the token from local storage.
  const token = localStorage.getItem('auth_token');

  if (token) {
    // Clone the request to add the new header.
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(cloned);
  } else {
    return next(req);
  }
};
