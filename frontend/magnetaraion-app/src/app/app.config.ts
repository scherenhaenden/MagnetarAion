import { ApplicationConfig, provideZoneChangeDetection, provideAppInitializer, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { routes } from './app.routes';
import { ConfigService } from './services/config.service';
import { httpErrorInterceptor } from './interceptors/http-error.interceptor';
import { httpTokenInterceptor } from './interceptors/http-token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpTokenInterceptor, httpErrorInterceptor])),
    provideAppInitializer(() => {
      const configService = inject(ConfigService);
      return firstValueFrom(configService.loadConfig());
    })
  ]
};
