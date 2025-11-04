import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IssueListComponent } from './components/issue-list/issue-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IssueListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('magnetaraion-app');
}
