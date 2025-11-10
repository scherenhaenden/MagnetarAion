import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs/operators';

/**
 * LoginComponent
 *
 * Responsible for rendering the login form and authenticating users.
 * On init the component checks whether the user is already authenticated
 * (via AuthService). If the user is already authenticated they are
 * redirected to the dashboards page.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage: string | null = null;
  public isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * Angular lifecycle hook called after construction.
   * Checks authentication state once; if already authenticated the user
   * is redirected to `/dashboards`.
   *
   * @returns void
   */
  public ngOnInit(): void {
    this.authService.isAuthenticated$.pipe(take(1)).subscribe((isAuth: boolean) => {
      if (isAuth) {
        this.router.navigate(['/dashboards']);
      }
    });
  }

  public onSubmit(): void {
    if (this.loginForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.errorMessage = null;

      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboards']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Login failed', err);
          this.errorMessage = err.error?.detail || 'Incorrect username or password. Please try again.';
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }
}
