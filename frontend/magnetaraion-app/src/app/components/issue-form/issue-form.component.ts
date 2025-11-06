import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Issue } from '../../models/issue.model';

@Component({
  selector: 'app-issue-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="issueForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="title">Title</label>
        <input id="title" type="text" formControlName="title" required>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" formControlName="description"></textarea>
      </div>
      <div class="form-group">
        <label for="project_id">Project ID</label>
        <input id="project_id" type="text" formControlName="project_id" required>
      </div>
      <button type="submit" [disabled]="!issueForm.valid">Create</button>
      <button type="button" (click)="close()">Cancel</button>
    </form>
  `,
  styles: [`
    .form-group {
      margin-bottom: 1rem;
    }
  `]
})
export class IssueFormComponent {
  issueForm: FormGroup;
  @Output() formClose = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.issueForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      project_id: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.issueForm.valid) {
      this.apiService.post<Issue, Partial<Issue>>('/issues/', this.issueForm.value).subscribe(() => {
        this.formClose.emit();
      });
    }
  }

  close(): void {
    this.formClose.emit();
  }
}
