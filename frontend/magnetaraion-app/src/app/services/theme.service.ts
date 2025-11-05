import { Injectable } from '@angular/core';

type ThemeName = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public toggleTheme(): ThemeName {
    const htmlEl = document.documentElement;
    if (htmlEl.hasAttribute('data-theme')) {
      htmlEl.removeAttribute('data-theme');
      localStorage.removeItem('theme');
      return 'light';
    } else {
      htmlEl.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      return 'dark';
    }
  }

  public loadTheme(): ThemeName {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      return 'dark';
    }

    document.documentElement.removeAttribute('data-theme');
    return 'light';
  }

  public getCurrentTheme(): ThemeName {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }
}
