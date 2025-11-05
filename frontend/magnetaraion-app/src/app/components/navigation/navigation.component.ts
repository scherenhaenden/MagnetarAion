import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

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

type QuickActionIcon = 'plus' | 'settings' | 'help' | 'notifications' | 'profile' | 'collapse';

type QuickAction = {
  id: string;
  label: string;
  icon: QuickActionIcon;
};

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.scss']
})
export class NavigationComponent {
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

  public readonly quickActions: QuickAction[] = [
    { id: 'create', label: 'Neues Ticket', icon: 'plus' },
    { id: 'administration', label: 'Administration', icon: 'settings' },
    { id: 'help', label: 'Hilfe & Leitfäden', icon: 'help' },
    { id: 'notifications', label: 'Benachrichtigungen', icon: 'notifications' },
    { id: 'profile', label: 'Mein Profil', icon: 'profile' },
    { id: 'collapse', label: 'Navigation reduzieren', icon: 'collapse' }
  ];

  public isQuickActionsOpen = false;

  public constructor(
    private readonly router: Router,
    private readonly hostElement: ElementRef<HTMLElement>
  ) {}

  public toggleQuickActions(event: MouseEvent): void {
    event.stopPropagation();
    this.isQuickActionsOpen = !this.isQuickActionsOpen;
  }

  public onQuickActionsContainerClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  public closeQuickActions(): void {
    this.isQuickActionsOpen = false;
  }

  public navigateTo(path: string): void {
    this.router.navigateByUrl(path);
  }

  @HostListener('document:click', ['$event'])
  public handleDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (!target) {
      return;
    }

    if (!this.hostElement.nativeElement.contains(target)) {
      this.closeQuickActions();
    }
  }

  public handleQuickActionClick(action: QuickAction): void {
    this.closeQuickActions();

    if (action.id === 'create') {
      this.navigateTo('/tickets');
    }
  }
}
