import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: ''
})
class DummyForgotPasswordComponent {}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'forgot-password', component: DummyForgotPasswordComponent }
        ])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a link to the forgot password page', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const forgotPasswordLink = compiled.querySelector('a[routerLink="/forgot-password"]');
    expect(forgotPasswordLink).toBeTruthy();
    expect(forgotPasswordLink?.textContent).toContain('Forgot Password?');
  });

  it('should navigate to forgot password page when link is clicked', async () => {
    const forgotPasswordLink: DebugElement = fixture.debugElement.query(By.css('a[routerLink="/forgot-password"]'));

    expect(forgotPasswordLink).toBeTruthy();

    forgotPasswordLink.nativeElement.click();
    fixture.detectChanges();

    // Wait for navigation
    await fixture.whenStable();

    // Verify the routerLink attribute is set correctly
    expect(forgotPasswordLink.nativeElement.getAttribute('routerLink')).toBe('/forgot-password');
  });

  it('forgot password link should be visible and clickable', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const forgotPasswordLink = compiled.querySelector('a[routerLink="/forgot-password"]') as HTMLElement;

    expect(forgotPasswordLink).toBeTruthy();
    expect(forgotPasswordLink.offsetParent).not.toBeNull(); // Element is visible

    // Check if link has proper styling
    const styles = window.getComputedStyle(forgotPasswordLink);
    expect(styles.cursor).toBe('pointer');
  });

  it('should display the forgot password link in the correct location', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const forgotPasswordContainer = compiled.querySelector('.forgot-password-link');
    const forgotPasswordLink = forgotPasswordContainer?.querySelector('a[routerLink="/forgot-password"]');

    expect(forgotPasswordContainer).toBeTruthy();
    expect(forgotPasswordLink).toBeTruthy();
  });

  it('should not trigger login when clicking forgot password link', () => {
    const submitSpy = spyOn(component, 'onSubmit');
    const forgotPasswordLink: DebugElement = fixture.debugElement.query(By.css('a[routerLink="/forgot-password"]'));

    forgotPasswordLink.nativeElement.click();
    fixture.detectChanges();

    // onSubmit should not be called when clicking the forgot password link
    expect(submitSpy).not.toHaveBeenCalled();
  });
});
