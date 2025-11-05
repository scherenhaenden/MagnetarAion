import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { AgileBoardsComponent } from './pages/agile-boards/agile-boards.component';
import { BerichteComponent } from './pages/berichte/berichte.component';
import { ProjekteComponent } from './pages/projekte/projekte.component';
import { WissensdatenbankComponent } from './pages/wissensdatenbank/wissensdatenbank.component';
import { ZeittabellenComponent } from './pages/zeittabellen/zeittabellen.component';
import { GanttDiagrammeComponent } from './pages/gantt-diagramme/gantt-diagramme.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboards' },
  { path: 'tickets', component: TicketsComponent },
  { path: 'dashboards', component: DashboardComponent },
  { path: 'agile-boards', component: AgileBoardsComponent },
  { path: 'berichte', component: BerichteComponent },
  { path: 'projekte', component: ProjekteComponent },
  { path: 'wissensdatenbank', component: WissensdatenbankComponent },
  { path: 'zeittabellen', component: ZeittabellenComponent },
  { path: 'gantt-diagramme', component: GanttDiagrammeComponent },
  { path: '**', redirectTo: 'dashboards' }
];
