import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

export interface Project {
  id: number;
  name: string;
  key: string;
  description: string | null;
  progress: number;
  owner: string;
  status: string;
  statusClass: string;
}

export interface ProjectCreate {
  name: string;
  key: string;
  description: string | null;
}

interface ProjectApi {
  id: number;
  name: string;
  key: string;
  description: string | null;
  issues: { status: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsUrl = '/projects/';

  constructor(private apiService: ApiService) { }

  /**
   * Retrieves a list of projects and processes their data.
   */
  public getProjects(): Observable<Project[]> {
    return this.apiService.get<ProjectApi[], never>(this.projectsUrl).pipe(
      map(projects => projects.map(p => {
        const progress = this.calculateProgress(p.issues);
        const status = this.getProjectStatus(p.issues);
        return {
          ...p,
          progress,
          owner: 'N/A', // TODO: Add owner field to backend API
          status,
          statusClass: this.getStatusClass(status)
        };
      }))
    );
  }

  private calculateProgress(issues: { status: string }[]): number {
    if (issues.length === 0) return 0;
    const done = issues.filter(i => i.status === 'Done').length;
    return Math.round((done / issues.length) * 100);
  }

  private getProjectStatus(issues: { status: string }[]): string {
    if (issues.length === 0) return 'No Issues';
    const allDone = issues.every(i => i.status === 'Done');
    if (allDone) return 'Completed';
    const anyInProgress = issues.some(i => i.status === 'In Progress');
    if (anyInProgress) return 'In Progress';
    return 'Open';
  }

  private getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Completed': 'completed',
      'In Progress': 'in-progress',
      'Open': 'open',
      'No Issues': 'no-issues'
    };
    return statusMap[status] || 'open';
  }

 /**
   * Creates a new project.
   */
  public createProject(project: ProjectCreate): Observable<Project> {
    return this.apiService.post<Project, ProjectCreate>(this.projectsUrl, project);
  }
}
