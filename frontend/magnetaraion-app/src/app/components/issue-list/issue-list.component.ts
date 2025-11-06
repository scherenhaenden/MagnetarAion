import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Issue } from '../../models/issue.model';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {
  issues: Issue[] = [];
  filterForm: FormGroup;

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
  fetchIssues(): void {
    const filters = this.filterForm.value;
    this.apiService.get<Issue[]>('/issues/', filters).subscribe((data: Issue[]) => {
      this.issues = data;
    });
  }

  /**
   * Triggers the fetching of issues.
   */
  onFilter(): void {
    this.fetchIssues();
  }
}
