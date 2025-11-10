import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SetupGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.checkSetupNeeded().pipe(
      map(response => {
        console.log('Setup check response:', response);
        if (response.setup_needed) {
          console.log('Setup is needed, redirecting to /setup');
          // Return an UrlTree to redirect to /setup and block the requested navigation
          this.router.navigate(['/setup']).then(() => {});
          //return this.router.createUrlTree(['/setup']);
          return false;
        } else {
          this.router.navigate(['/login']).then(() => {});
          //return this.router.createUrlTree(['/login']);
          return true;
        }
      })
    );
  }
}
