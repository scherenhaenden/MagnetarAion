import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent {
  projects = [
    { name: 'MagnetarAion', issueCount: 12, progress: 60 },
    { name: 'Website Redesign', issueCount: 5, progress: 30 },
    { name: 'API Development', issueCount: 8, progress: 80 }
  ];
}
