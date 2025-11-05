import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IssueListComponent } from '../../components/issue-list/issue-list.component';
import { IssuesAssignedToMeComponent } from '../../components/issues-assigned-to-me/issues-assigned-to-me.component';

@Component({
  selector: 'app-tickets-page',
  standalone: true,
  imports: [CommonModule, IssueListComponent, IssuesAssignedToMeComponent],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent {}
