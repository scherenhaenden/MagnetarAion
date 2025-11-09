import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent {
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
