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

  public constructor(private themeService: ThemeService) {}

  public ngOnInit(): void {
    this.themeService.loadTheme();
  }

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
