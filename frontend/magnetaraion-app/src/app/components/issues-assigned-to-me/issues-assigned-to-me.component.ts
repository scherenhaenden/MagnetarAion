import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type PriorityClass = 'high' | 'medium' | 'low';

interface AssignedIssue {
  id: number;
  title: string;
  project: string;
  priorityLabel: string;
  priorityClass: PriorityClass;
}

@Component({
  selector: 'app-issues-assigned-to-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './issues-assigned-to-me.component.html',
  styleUrls: ['./issues-assigned-to-me.component.scss']
})
export class IssuesAssignedToMeComponent {
  public readonly issues: AssignedIssue[] = [
    { id: 1, title: 'Login-Problem beheben', project: 'MagnetarAion', priorityLabel: 'Hoch', priorityClass: 'high' },
    { id: 2, title: 'Dunkles Theme finalisieren', project: 'MagnetarAion', priorityLabel: 'Mittel', priorityClass: 'medium' },
    { id: 3, title: 'Neue Widgets für Dashboard vorbereiten', project: 'MagnetarAion', priorityLabel: 'Mittel', priorityClass: 'medium' }
  ];
}
