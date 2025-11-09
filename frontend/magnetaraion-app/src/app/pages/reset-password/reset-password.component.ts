import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

// Custom validator to check that two fields match
function passwordMatchValidator(group: FormGroup): ValidationErrors | null {
  const password = group.get('newPassword')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  message: string = '';
  isError: boolean = false;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (!this.token) {
      this.message = 'Invalid or missing password reset token.';
      this.isError = true;
    }
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid && this.token) {
      const { newPassword } = this.resetPasswordForm.value;
      this.apiService.post('/password-reset', { token: this.token, new_password: newPassword }).subscribe({
        next: (response: any) => {
          this.message = response.msg;
          this.isError = false;
          setTimeout(() => this.router.navigate(['/login']), 3000); // Redirect to login after 3 seconds
        },
        error: (error) => {
          this.message = error.error.detail || 'An unexpected error occurred. Please try again.';
          this.isError = true;
        }
      });
    }
  }
}
