import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  message: string = '';
  isError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      this.apiService.post('/password-reset-request', this.forgotPasswordForm.value).subscribe({
        next: (response: any) => {
          this.message = response.msg;
          this.isError = false;
        },
        error: (error: any) => {
          console.error('Password reset request failed:', error);
          this.message = error?.error?.detail || 'An unexpected error occurred. Please try again.';
          this.isError = true;
        }
      });
    }
  }
}
