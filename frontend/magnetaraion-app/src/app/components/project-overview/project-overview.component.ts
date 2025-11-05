import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProjectOverviewItem {
  name: string;
  issueCount: number;
  progress: number;
}

@Component({
  selector: 'app-project-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent {
  public readonly projects: ProjectOverviewItem[] = [
    { name: 'MagnetarAion Plattform', issueCount: 12, progress: 60 },
    { name: 'Website-Relaunch', issueCount: 5, progress: 30 },
    { name: 'API-Entwicklung', issueCount: 8, progress: 80 }
  ];
}
