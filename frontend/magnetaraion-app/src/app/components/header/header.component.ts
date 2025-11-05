import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

type QuickActionIcon = 'plus' | 'settings' | 'help' | 'notifications' | 'profile' | 'collapse';

type QuickAction = {
  id: string;
  label: string;
  icon: QuickActionIcon;
};

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {
  public currentTheme: 'light' | 'dark' = 'light';

  public readonly quickActions: QuickAction[] = [
    { id: 'create', label: 'Ticket erstellen', icon: 'plus' },
    { id: 'administration', label: 'Administration', icon: 'settings' },
    { id: 'help', label: 'Hilfe & Leitfäden', icon: 'help' },
    { id: 'notifications', label: 'Benachrichtigungen', icon: 'notifications' },
    { id: 'profile', label: 'Profil & Team', icon: 'profile' },
    { id: 'collapse', label: 'Bereich reduzieren', icon: 'collapse' }
  ];

  public constructor(
    private readonly themeService: ThemeService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.currentTheme = this.themeService.loadTheme();
  }

  public toggleTheme(): void {
    this.currentTheme = this.themeService.toggleTheme();
  }

  public handleQuickActionClick(action: QuickAction): void {
    if (action.id === 'create') {
      this.router.navigateByUrl('/tickets');
    }
  }
}
