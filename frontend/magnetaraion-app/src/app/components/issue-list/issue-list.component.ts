import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Issue } from '../../models/issue.model';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {
  issues: Issue[] = [];

  constructor(private apiService: ApiService) { }

  /**
   * Initializes the component by fetching issues from the API.
   */
  public ngOnInit(): void {
    this.apiService.get<Issue[]>('/issues/').subscribe((data: Issue[]) => {
      this.issues = data;
    });
  }
}
