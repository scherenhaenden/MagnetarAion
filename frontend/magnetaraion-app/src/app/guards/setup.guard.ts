import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

export const setupGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkSetupNeeded().pipe(
    map(response => {
      if (response.setup_needed) {
        return router.createUrlTree(['/setup']);
      } else {
        return true;
      }
    })
  );
};
