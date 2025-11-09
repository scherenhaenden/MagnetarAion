import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService, ProjectCreate } from '../../../services/project.service';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent {
  public projectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      key: ['', [Validators.required, Validators.maxLength(10)]],
      description: ['']
    });
  }

  public async onSubmit(): Promise<void> {
    if (this.projectForm.valid) {
      const newProject: ProjectCreate = this.projectForm.value;
      this.projectService.createProject(newProject).subscribe({
        next: () => this.router.navigate(['/projekte']),
        error: (err) => {
          // TODO: Implement user-facing error handling (e.g., a toast message)
          console.error('Failed to create project:', err);
        }
      });
    }
  }

  public async onCancel(): Promise<void> {
    await this.router.navigate(['/projekte']);
  }
}
