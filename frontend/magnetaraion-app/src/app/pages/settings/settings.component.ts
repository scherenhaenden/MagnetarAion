import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public currentTheme: 'light' | 'dark' = 'light';

  constructor(private themeService: ThemeService) {}

  public ngOnInit(): void {
    this.currentTheme = this.themeService.loadTheme();
  }

  public toggleTheme(): void {
    this.currentTheme = this.themeService.toggleTheme();
  }
}
