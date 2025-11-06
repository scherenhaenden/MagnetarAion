import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * **ApiService**
 *
 * A centralized service for handling HTTP requests (GET, POST, PUT, DELETE).
 * This service wraps Angular's HttpClient to include a base URL and default headers,
 * and provides centralized error handling.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /** Base URL for all API requests */
  private apiUrl = environment.apiUrl;

  /** Default HTTP headers for JSON content */
  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  /**
   * Sends an HTTP POST request to the specified URL with the given body.
   *
   * @typeParam T - Expected response type.
   * @typeParam U - Type of the request payload.
   * @param url - Endpoint URL (appended to the base URL).
   * @param body - Request payload.
   * @param httpHeaders - Optional HTTP headers.
   * @param httpParamsOrModel - Optional HTTP parameters or an object to be converted to parameters.
   * @returns An Observable of type `T`.
   */
  public post<T, U>(
    url: string,
    body: U,
    httpHeaders?: HttpHeaders,
    httpParamsOrModel?: HttpParams | Record<string, any>
  ): Observable<T> {
    const headers = httpHeaders || this.defaultHeaders;
    const params = this.buildHttpParams(httpParamsOrModel);
    const options = { headers, params };
    const fullUrl = this.apiUrl + url;

    return this.http.post<T>(fullUrl, body, options);
  }

  /**
   * Sends an HTTP PUT request to the specified URL with the given body.
   *
   * @typeParam T - Expected response type.
   * @typeParam U - Type of the request payload.
   * @param url - Endpoint URL (appended to the base URL).
   * @param body - Request payload.
   * @param httpHeaders - Optional HTTP headers.
   * @param httpParamsOrModel - Optional HTTP parameters or an object to be converted to parameters.
   * @returns An Observable of type `T`.
   */
  public put<T, U>(
    url: string,
    body: U,
    httpHeaders?: HttpHeaders,
    httpParamsOrModel?: HttpParams | Record<string, any>
  ): Observable<T> {
    const headers = httpHeaders || this.defaultHeaders;
    const params = this.buildHttpParams(httpParamsOrModel);
    const options = { headers, params };
    const fullUrl = this.apiUrl + url;

    return this.http.put<T>(fullUrl, body, options);
  }

  /**
   * Sends an HTTP DELETE request to the specified URL.
   * @typeParam T - Expected response type.
   * @param url - Endpoint URL (appended to the base URL).
   * @param httpHeaders - Optional HTTP headers.
   * @param httpParamsOrModel - Optional HTTP parameters or an object to be converted to parameters.
   * @returns An Observable of type `T`.
   */
  public delete<T>(
    url: string,
    httpHeaders?: HttpHeaders,
    httpParamsOrModel?: HttpParams | Record<string, any>
  ): Observable<T> {
    const headers = httpHeaders || this.defaultHeaders;
    const params = this.buildHttpParams(httpParamsOrModel);
    const options = { headers, params };
    const fullUrl = this.apiUrl + url;

    return this.http.delete<T>(fullUrl, options);
  }

  /**
   * Sends an HTTP GET request to the specified URL.
   * @typeParam T - Expected response type.
   * @param url - Endpoint URL (appended to the base URL).
   * @param httpParamsOrModel - Optional HTTP parameters or an object to be converted to parameters.
   * @param httpHeaders - Optional HTTP headers.
   * @returns An Observable of type `T`.
   */
  public get<T>(
    url: string,
    httpParamsOrModel?: HttpParams | Record<string, any>,
    httpHeaders?: HttpHeaders
  ): Observable<T> {
    const headers = httpHeaders || this.defaultHeaders;
    const params = this.buildHttpParams(httpParamsOrModel);
    const options = { headers, params };
    const fullUrl = this.apiUrl + url;

    return this.http.get<T>(fullUrl, options);
  }

  /**
   * Builds HTTP parameters from an object or returns the existing HttpParams instance.
   *
   * This function checks if the provided `paramsOrModel` is an instance of HttpParams.
   * If it is, it returns that instance directly. If `paramsOrModel` is an object,
   * it converts it into an HttpParams instance using the fromObject method.
   * If neither condition is met, it returns undefined.
   *
   * @param paramsOrModel - An object or HttpParams instance.
   */
  private buildHttpParams(
    paramsOrModel?: HttpParams | Record<string, any>
  ): HttpParams | undefined {
    if (paramsOrModel instanceof HttpParams) {
      // Parameters are already an instance of HttpParams.
      return paramsOrModel;
    } else if (paramsOrModel && typeof paramsOrModel === 'object') {
      // Convert the object to HttpParams.
      return new HttpParams({ fromObject: paramsOrModel });
    }
    return undefined;
  }
}
