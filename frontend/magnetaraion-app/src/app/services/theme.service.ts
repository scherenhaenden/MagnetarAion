import { Injectable } from '@angular/core';

type ThemeName = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public toggleTheme(): ThemeName {
    const nextTheme: ThemeName = this.getCurrentTheme() === 'dark' ? 'light' : 'dark';
    this.applyTheme(nextTheme, true);
    return nextTheme;
  }

  public loadTheme(): ThemeName {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      this.applyTheme(storedTheme);
      return storedTheme;
    }

    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false;
    const detectedTheme: ThemeName = prefersDark ? 'dark' : 'light';
    this.applyTheme(detectedTheme);
    return detectedTheme;
  }

  public getCurrentTheme(): ThemeName {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  private applyTheme(theme: ThemeName, persist = false): void {
    document.documentElement.setAttribute('data-theme', theme);
    if (persist) {
      localStorage.setItem('theme', theme);
    }
  }
}
