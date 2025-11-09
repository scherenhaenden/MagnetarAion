import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Icon } from '../icon/icon';

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
  path?: string;
};

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, Icon],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {

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
    { id: 'create', label: 'Erstellen', icon: 'plus', path: '/tickets' },
    { id: 'administration', label: 'Administration', icon: 'settings', path: '/settings' },
    { id: 'help', label: 'Hilfe', icon: 'help' },
    { id: 'notifications', label: 'Benachrichtigungen', icon: 'notifications' },
    { id: 'profile', label: 'AD admin', icon: 'profile' },
    { id: 'collapse', label: 'Reduzieren', icon: 'collapse' }
  ];

  public isQuickActionsOpen = false;

  public constructor(
    private readonly router: Router,
    private readonly hostElement: ElementRef<HTMLElement>
  ) {}

  /**
   * Toggles the state of quick actions on mouse event.
   */
  public toggleQuickActions(event: MouseEvent): void {
    event.stopPropagation();
    this.isQuickActionsOpen = !this.isQuickActionsOpen;
  }

  /**
   * Stops the propagation of the click event.
   */
  public onQuickActionsContainerClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  /**
   * Closes the quick actions menu.
   */
  public closeQuickActions(): void {
    this.isQuickActionsOpen = false;
  }

  public navigateTo(path: string): void {
    this.router.navigateByUrl(path);
  }

  /**
   * Handles click events on the document.
   *
   * This method checks if the click event's target is outside of the host element.
   * If the target is not contained within the host element, it triggers the
   * closeQuickActions method to close any open quick actions.
   *
   * @param event - The MouseEvent triggered by the document click.
   */
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

    if (action.path) {
      this.navigateTo(action.path);
    }
    // Handle other non-navigation actions here if needed.
  }
}
