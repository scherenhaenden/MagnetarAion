import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public toggleTheme(): void {
    const htmlEl = document.documentElement;
    if (htmlEl.hasAttribute('data-theme')) {
      htmlEl.removeAttribute('data-theme');
      localStorage.removeItem('theme');
    } else {
      htmlEl.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  public loadTheme(): void {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }
}
