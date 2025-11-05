import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface GanttMilestone {
  title: string;
  start: string;
  end: string;
  statusLabel: string;
  statusClass: 'in-arbeit' | 'abgeschlossen' | 'risiko';
}

@Component({
  selector: 'app-gantt-diagramme-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gantt-diagramme.component.html',
  styleUrls: ['./gantt-diagramme.component.scss']
})
export class GanttDiagrammeComponent {
  public readonly milestones: GanttMilestone[] = [
    { title: 'Backend API v2', start: '01.03.2024', end: '22.03.2024', statusLabel: 'In Arbeit', statusClass: 'in-arbeit' },
    { title: 'Beta-Release', start: '25.03.2024', end: '29.03.2024', statusLabel: 'Risiko', statusClass: 'risiko' },
    { title: 'Go-Live', start: '08.04.2024', end: '12.04.2024', statusLabel: 'Abgeschlossen', statusClass: 'abgeschlossen' }
  ];
}
