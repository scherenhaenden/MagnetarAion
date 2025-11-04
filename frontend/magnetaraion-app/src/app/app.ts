import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IssueListComponent } from './components/issue-list/issue-list.component';
import { HeaderComponent } from './components/header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IssueListComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('magnetaraion-app');
}
