import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Issue } from '../../models/issue.model';
import { IssueFormComponent } from '../issue-form/issue-form.component';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IssueFormComponent],
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {
  public issues: Issue[] = [];
  public filterForm: FormGroup;
  public showCreateIssueModal = false;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      project_id: [''],
      assignee_id: [''],
      status: [''],
      priority: ['']
    });
  }

  /**
   * Initializes the component by fetching issues.
   */
  public ngOnInit(): void {
    this.fetchIssues();
  }

  /**
   * Fetches issues from the API and updates the issues list.
   */
  public fetchIssues(): void {
    const filters = this.filterForm.value;
    this.apiService.get<Issue[]>('/issues/', filters).subscribe((data: Issue[]) => {
      this.issues = data;
    });
  }

  /**
   * Triggers the fetching of issues.
   */
  public onFilter(): void {
    this.fetchIssues();
  }

  public onStatusChange(event: Event, issue: Issue): void {
    const newStatus = (event.target as HTMLSelectElement).value;
    this.apiService.patch(`/issues/${issue.id}`, { status: newStatus }).subscribe(() => {
      this.fetchIssues();
    });
  }

  public onFormClose(): void {
    this.showCreateIssueModal = false;
    this.fetchIssues();
  }
}
