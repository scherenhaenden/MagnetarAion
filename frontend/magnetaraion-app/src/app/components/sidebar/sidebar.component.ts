import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

type NavIcon =
  | 'tickets'
  | 'dashboards'
  | 'agile'
  | 'reports'
  | 'projects'
  | 'knowledge'
  | 'timesheets'
  | 'gantt';

type NavItem = {
  id: string;
  label: string;
  icon: NavIcon;
  path: string;
  exact?: boolean;
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class SidebarComponent {
  public readonly navItems: NavItem[] = [
    { id: 'tickets', label: 'Tickets', icon: 'tickets', path: '/tickets' },
    { id: 'dashboards', label: 'Dashboards', icon: 'dashboards', path: '/dashboards' },
    { id: 'agile-boards', label: 'Agile-Boards', icon: 'agile', path: '/agile-boards' },
    { id: 'reports', label: 'Berichte', icon: 'reports', path: '/berichte' },
    { id: 'projects', label: 'Projekte', icon: 'projects', path: '/projekte' },
    { id: 'knowledge', label: 'Wissensdatenbank', icon: 'knowledge', path: '/wissensdatenbank', exact: true },
    { id: 'timesheets', label: 'Zeittabellen', icon: 'timesheets', path: '/zeittabellen' },
    { id: 'gantt', label: 'Gantt-Diagramme', icon: 'gantt', path: '/gantt-diagramme' }
  ];
}
