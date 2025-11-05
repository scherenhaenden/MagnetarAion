import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

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

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.configService.apiUrl}/projects/`);
  }

  createProject(project: ProjectCreate): Observable<Project> {
    return this.http.post<Project>(`${this.configService.apiUrl}/projects/`, project);
  }
}
