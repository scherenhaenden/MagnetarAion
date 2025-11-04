import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {
  ngOnInit() {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  toggleTheme() {
    const htmlEl = document.documentElement;
    if (htmlEl.hasAttribute('data-theme')) {
      htmlEl.removeAttribute('data-theme');
      localStorage.removeItem('theme');
    } else {
      htmlEl.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  }
}
