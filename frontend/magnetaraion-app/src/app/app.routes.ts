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
import { SetupGuard } from './guards/setup.guard';
import { SetupComponent } from './pages/setup/setup.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { publicGuard } from './guards/public.guard';
import { ROUTES } from './routes.constants';

export const routes: Routes = [
  { path: '', redirectTo: ROUTES.SETUP, pathMatch: 'full' },
  { path: ROUTES.SETUP, component: SetupComponent, canActivate: [SetupGuard] },
  { path: ROUTES.LOGIN, component: LoginComponent, canActivate: [publicGuard] },
  { path: ROUTES.FORGOT_PASSWORD, loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent), canActivate: [publicGuard] },
  { path: ROUTES.RESET_PASSWORD, loadComponent: () => import('./pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent), canActivate: [publicGuard] },
  /*{ path: ROUTES.DASHBOARDS, component: DashboardComponent, canActivate: [authGuard] },
  { path: ROUTES.TICKETS, component: TicketsComponent, canActivate: [authGuard] },
  { path: ROUTES.AGILE_BOARDS, component: AgileBoardsComponent, canActivate: [authGuard] },
  { path: ROUTES.BERICHTE, component: BerichteComponent, canActivate: [authGuard] },
  { path: ROUTES.PROJEKTE, component: ProjekteComponent, canActivate: [authGuard] },
  { path: ROUTES.PROJEKTE_NEW, component: ProjectFormComponent, canActivate: [authGuard] },
  { path: ROUTES.WISSENSDATENBANK, component: WissensdatenbankComponent, canActivate: [authGuard] },
  { path: ROUTES.ZEITTABELLEN, component: ZeittabellenComponent, canActivate: [authGuard] },
  { path: ROUTES.GANTT_DIAGRAMME, component: GanttDiagrammeComponent, canActivate: [authGuard] },
  { path: ROUTES.SETTINGS, component: SettingsComponent, canActivate: [authGuard] },
  { path: ROUTES.NOT_FOUND, component: NotFoundComponent },
  { path: '**', redirectTo: `/${ROUTES.NOT_FOUND}` }*/
];
