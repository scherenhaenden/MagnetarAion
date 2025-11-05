import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {
  public currentTheme: 'light' | 'dark' = 'light';

  public constructor(private readonly themeService: ThemeService) {}

  public ngOnInit(): void {
    this.currentTheme = this.themeService.loadTheme();
  }

  public toggleTheme(): void {
    this.currentTheme = this.themeService.toggleTheme();
  }
}
