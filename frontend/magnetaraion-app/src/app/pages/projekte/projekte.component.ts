import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ProjectSummary {
  name: string;
  owner: string;
  status: 'Aktiv' | 'Geplant' | 'Abgeschlossen';
  progress: number;
}

@Component({
  selector: 'app-projekte-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projekte.component.html',
  styleUrls: ['./projekte.component.scss']
})
export class ProjekteComponent {
  public readonly projects: ProjectSummary[] = [
    { name: 'MagnetarAion Plattform', owner: 'Team Blau', status: 'Aktiv', progress: 68 },
    { name: 'Website-Relaunch', owner: 'Team Rot', status: 'Geplant', progress: 25 },
    { name: 'Mobile App', owner: 'Team Gelb', status: 'Aktiv', progress: 54 },
    { name: 'Qualitätsoffensive', owner: 'Team QA', status: 'Abgeschlossen', progress: 100 }
  ];
}
