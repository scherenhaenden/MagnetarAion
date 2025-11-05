import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, shareReplay } from 'rxjs/operators';

export interface Config {
  apiUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: Config | null = null;
  private config$: Observable<Config> | null = null;

  constructor(private http: HttpClient) {}

  loadConfig(): Observable<Config> {
    if (!this.config$) {
      this.config$ = this.http.get<Config>('./assets/config.json').pipe(
        tap(config => this.config = config),
        catchError(() => {
          this.config = { apiUrl: 'http://localhost:8000/api' };
          return of(this.config);
        }),
        shareReplay(1)
      );
    }
    return this.config$;
  }

  get apiUrl(): string {
    return this.config?.apiUrl || 'http://localhost:8000/api';
  }
}
