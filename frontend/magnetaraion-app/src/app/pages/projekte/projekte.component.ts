import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Project, ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projekte-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projekte.component.html',
  styleUrls: ['./projekte.component.scss']
})
export class ProjekteComponent implements OnInit {
  public projects: Project[] = [];

  constructor(private projectService: ProjectService, private router: Router) { }

  public ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
      },
      error: (err) => {
        // TODO: Implement user-facing error notification (e.g., a toast message)
        console.error('Failed to fetch projects:', err);
        this.projects = []; // Ensure projects is empty on error
      }
    });
  }

  public async navigateToAddProject(): Promise<void> {
    await this.router.navigate(['/projekte/neu']);
  }
}
