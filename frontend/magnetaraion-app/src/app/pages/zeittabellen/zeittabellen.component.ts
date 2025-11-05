import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface TimesheetEntry {
  project: string;
  activity: string;
  hours: number;
  date: string;
}

@Component({
  selector: 'app-zeittabellen-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './zeittabellen.component.html',
  styleUrls: ['./zeittabellen.component.scss']
})
export class ZeittabellenComponent {
  public readonly entries: TimesheetEntry[] = [
    { project: 'MagnetarAion Plattform', activity: 'Implementierung', hours: 6, date: '12.03.2024' },
    { project: 'Website-Relaunch', activity: 'Code-Review', hours: 2, date: '12.03.2024' },
    { project: 'Mobile App', activity: 'Konzeptworkshop', hours: 3.5, date: '11.03.2024' }
  ];
}
