import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
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
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(public themeService: ThemeService) { }

  @HostBinding('class.dark-theme') get isDarkTheme() {
    return this.themeService.isDark();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
