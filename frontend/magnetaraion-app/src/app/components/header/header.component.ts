import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

type NavIcon =
  | 'tickets'
  | 'dashboards'
  | 'agile'
  | 'reports'
  | 'projects'
  | 'knowledge'
  | 'timesheets'
  | 'gantt';

type NavItem = {
  id: string;
  label: string;
  icon: NavIcon;
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

  public readonly navItems: NavItem[] = [
    { id: 'tickets', label: 'Tickets', icon: 'tickets' },
    { id: 'dashboards', label: 'Dashboards', icon: 'dashboards' },
    { id: 'agile', label: 'Agile-Boards', icon: 'agile' },
    { id: 'reports', label: 'Berichte', icon: 'reports' },
    { id: 'projects', label: 'Projekte', icon: 'projects' },
    { id: 'knowledge', label: 'Wissensdatenbank', icon: 'knowledge' },
    { id: 'timesheets', label: 'Zeittabellen', icon: 'timesheets' },
    { id: 'gantt', label: 'Gantt-Diagramme', icon: 'gantt' }
  ];

  public activeItemId = 'dashboards';

  public constructor(private readonly themeService: ThemeService) {}

  public ngOnInit(): void {
    this.currentTheme = this.themeService.loadTheme();
  }

  public toggleTheme(): void {
    this.currentTheme = this.themeService.toggleTheme();
  }

  public setActiveItem(itemId: string): void {
    this.activeItemId = itemId;
  }
}
