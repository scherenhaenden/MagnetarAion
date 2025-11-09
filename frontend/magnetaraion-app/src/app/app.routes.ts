import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { AgileBoardsComponent } from './pages/agile-boards/agile-boards.component';
import { BerichteComponent } from './pages/berichte/berichte.component';
import { ProjekteComponent } from './pages/projekte/projekte.component';
import { ProjectFormComponent } from './pages/projekte/project-form/project-form.component';
import { WissensdatenbankComponent } from './pages/wissensdatenbank/wissensdatenbank.component';
import { ZeittabellenComponent } from './pages/zeittabellen/zeittabellen.component';
import { GanttDiagrammeComponent } from './pages/gantt-diagramme/gantt-diagramme.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { setupGuard } from './guards/setup.guard';
import { SetupComponent } from './pages/setup/setup.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboards', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
  { path: 'reset-password', loadComponent: () => import('./pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent) },
  { path: 'setup', component: SetupComponent, canActivate: [setupGuard] },
  { path: 'dashboards', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'tickets', component: TicketsComponent, canActivate: [authGuard] },
  { path: 'agile-boards', component: AgileBoardsComponent, canActivate: [authGuard] },
  { path: 'berichte', component: BerichteComponent, canActivate: [authGuard] },
  { path: 'projekte', component: ProjekteComponent, canActivate: [authGuard] },
  { path: 'projekte/neu', component: ProjectFormComponent, canActivate: [authGuard] },
  { path: 'wissensdatenbank', component: WissensdatenbankComponent, canActivate: [authGuard] },
  { path: 'zeittabellen', component: ZeittabellenComponent, canActivate: [authGuard] },
  { path: 'gantt-diagramme', component: GanttDiagrammeComponent, canActivate: [authGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];
