import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  isAuthenticated$: Observable<boolean>;
  currentUser$: Observable<User | null>;

  constructor(private router: Router, private authService: AuthService) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit() {
    this.authService.checkSetupNeeded().subscribe(response => {
      if (response.setup_needed) {
        this.router.navigate(['/setup']);
      }
    });
  }

  isLoginPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/setup';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
