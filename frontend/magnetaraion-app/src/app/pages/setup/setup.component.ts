import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';

/**
 * SetupComponent
 *
 * Responsible for the initial application setup UI where an administrator
 * account can be created. On init the component asks the backend (via
 * AuthService) whether setup is still required. If the application is
 * already installed (setup not needed) the user is redirected to the
 * login page.
 */
@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  public setupForm: FormGroup;
  public errorMessage: string | null = null;
  public successMessage: string | null = null;
  public isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.setupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Angular lifecycle hook called after component construction.
   *
   * Calls AuthService.checkSetupNeeded() once to determine whether the
   * application still requires initial setup. If the backend indicates
   * setup is not needed the user is redirected to the login page.
   *
   * @returns void
   */
  public ngOnInit(): void {
    this.authService.checkSetupNeeded().pipe(take(1)).subscribe({
      next: (res) => {
        // If setup is not needed (application already installed) redirect
        console.log('Setup needed response:', res);
        if (!res?.setup_needed) {
          this.router.navigate(['/login']);
        }
        // If setup_needed === true we stay on this page to allow creating admin
      },
      error: (err) => {
        // On error assume the safest UX: redirect to login so the user can try
        // to authenticate or see the proper error on the login page. Also log.
        console.error('Error checking setup status:', err);
        this.router.navigate(['/login']);
      }
    });
  }

  /**
   * Submit handler for the setup form. Registers the initial administrator
   * account via AuthService and redirects to the login page on success.
   *
   * @returns void
   */
  public onSubmit(): void {
    if (this.setupForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.errorMessage = null;
      this.successMessage = null;

      this.authService.register(this.setupForm.value).subscribe({
        next: () => {
          this.successMessage = 'Administrator account created successfully! Redirecting to login...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Setup error:', err);
          this.errorMessage = err.error?.detail || 'An unexpected error occurred. Please try again.';
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.setupForm.controls).forEach(key => {
        this.setupForm.get(key)?.markAsTouched();
      });
    }
  }
}
