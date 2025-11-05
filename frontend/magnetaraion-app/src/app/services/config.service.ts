import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Config {
  apiUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: Config | null = null;

  constructor(private http: HttpClient) {}

  loadConfig(): Observable<Config> {
    if (this.config) {
      return of(this.config);
    }
    return this.http.get<Config>('./assets/config.json').pipe(
      map(config => {
        this.config = config;
        return config;
      }),
      catchError(() => {
        // Fallback to default
        this.config = { apiUrl: 'http://localhost:8000/api' };
        return of(this.config);
      })
    );
  }

  get apiUrl(): string {
    return this.config?.apiUrl || 'http://localhost:8000/api';
  }
}
