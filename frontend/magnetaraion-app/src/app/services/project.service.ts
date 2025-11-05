import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Project {
  id: number;
  name: string;
  key: string;
  description: string | null;
}

export interface ProjectCreate {
  name: string;
  key: string;
  description: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects/`);
  }

  createProject(project: ProjectCreate): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/projects/`, project);
  }
}
