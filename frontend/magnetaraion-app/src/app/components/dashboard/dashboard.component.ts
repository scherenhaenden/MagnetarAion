import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssuesAssignedToMeComponent } from '../issues-assigned-to-me/issues-assigned-to-me.component';
import { ProjectOverviewComponent } from '../project-overview/project-overview.component';
import { BurndownChartComponent } from '../burndown-chart/burndown-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    IssuesAssignedToMeComponent,
    ProjectOverviewComponent,
    BurndownChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor() { }
}
