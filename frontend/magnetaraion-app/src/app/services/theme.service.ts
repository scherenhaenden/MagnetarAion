import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = signal(false);

  toggleTheme() {
    this.isDarkTheme.set(!this.isDarkTheme());
  }

  isDark() {
    return this.isDarkTheme();
  }
}
