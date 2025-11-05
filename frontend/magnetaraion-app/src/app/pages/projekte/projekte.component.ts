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

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  navigateToAddProject(): void {
    this.router.navigate(['/projekte/neu']);
  }
}
