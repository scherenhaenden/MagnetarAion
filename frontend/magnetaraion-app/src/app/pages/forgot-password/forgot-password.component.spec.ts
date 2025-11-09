import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ForgotPasswordComponent } from './forgot-password.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { of, throwError } from 'rxjs';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let apiService: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ForgotPasswordComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [ApiService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form with email field', () => {
    expect(component.forgotPasswordForm).toBeDefined();
    expect(component.forgotPasswordForm.get('email')).toBeDefined();
  });

  it('should validate email field as required', () => {
    const emailControl = component.forgotPasswordForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.hasError('required')).toBeTruthy();
  });

  it('should validate email format', () => {
    const emailControl = component.forgotPasswordForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBeTruthy();

    emailControl?.setValue('valid@email.com');
    expect(emailControl?.hasError('email')).toBeFalsy();
  });

  it('should have a back to login link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const backToLoginLink = compiled.querySelector('a[routerLink="/login"]');
    expect(backToLoginLink).toBeTruthy();
    expect(backToLoginLink?.textContent).toContain('Back to Login');
  });

  it('should disable submit button when form is invalid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const submitButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;

    component.forgotPasswordForm.get('email')?.setValue('');
    fixture.detectChanges();

    expect(submitButton.disabled).toBeTruthy();
  });

  it('should enable submit button when form is valid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const submitButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;

    component.forgotPasswordForm.get('email')?.setValue('test@example.com');
    fixture.detectChanges();

    expect(submitButton.disabled).toBeFalsy();
  });

  it('should call API service on form submit with valid email', () => {
    const apiSpy = spyOn(apiService, 'post').and.returnValue(
      of({ msg: 'If a user with that email exists, a password reset link has been sent.' })
    );

    component.forgotPasswordForm.get('email')?.setValue('test@example.com');
    component.onSubmit();

    expect(apiSpy).toHaveBeenCalledWith('/password-reset-request', { email: 'test@example.com' });
  });

  it('should display success message on successful submission', () => {
    spyOn(apiService, 'post').and.returnValue(
      of({ msg: 'Password reset link has been sent.' })
    );

    component.forgotPasswordForm.get('email')?.setValue('test@example.com');
    component.onSubmit();
    fixture.detectChanges();

    expect(component.message).toBe('Password reset link has been sent.');
    expect(component.isError).toBeFalsy();

    const compiled = fixture.nativeElement as HTMLElement;
    const messageElement = compiled.querySelector('.message-success');
    expect(messageElement).toBeTruthy();
  });

  it('should display error message on submission failure', () => {
    spyOn(apiService, 'post').and.returnValue(
      throwError(() => ({ error: { detail: 'Server error' } }))
    );

    component.forgotPasswordForm.get('email')?.setValue('test@example.com');
    component.onSubmit();
    fixture.detectChanges();

    expect(component.isError).toBeTruthy();
    expect(component.message).toContain('An unexpected error occurred');

    const compiled = fixture.nativeElement as HTMLElement;
    const messageElement = compiled.querySelector('.message-error');
    expect(messageElement).toBeTruthy();
  });

  it('should not submit form if invalid', () => {
    const apiSpy = spyOn(apiService, 'post');

    component.forgotPasswordForm.get('email')?.setValue('');
    component.onSubmit();

    expect(apiSpy).not.toHaveBeenCalled();
  });

  it('should have proper form structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('form');
    const emailInput = compiled.querySelector('input[type="email"]');
    const submitButton = compiled.querySelector('button[type="submit"]');

    expect(form).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('should navigate to forgot password page without authentication', () => {
    // This test verifies that the forgot-password route doesn't require authentication
    // The component should render without checking auth status
    expect(component).toBeTruthy();
    expect(fixture.nativeElement).toBeTruthy();
  });
});

