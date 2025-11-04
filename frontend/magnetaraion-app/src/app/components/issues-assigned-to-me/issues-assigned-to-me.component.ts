import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-issues-assigned-to-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './issues-assigned-to-me.component.html',
  styleUrls: ['./issues-assigned-to-me.component.scss']
})
export class IssuesAssignedToMeComponent {
  issues = [
    { id: 1, title: 'Fix login bug', project: 'MagnetarAion', priority: 'High' },
    { id: 2, title: 'Implement dark theme', project: 'MagnetarAion', priority: 'Medium' },
    { id: 3, title: 'Add new widgets to dashboard', project: 'MagnetarAion', priority: 'Medium' }
  ];
}
