import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-agile-boards-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agile-boards.component.html',
  styleUrls: ['./agile-boards.component.scss']
})
export class AgileBoardsComponent {
  public readonly agileTips: string[] = [
    'Plane Sprints mit klaren Zielen und überprüfbaren Ergebnissen.',
    'Halte tägliche Stand-ups kurz und fokussiert.',
    'Visualisiere Blocker direkt auf dem Board, um Engpässe früh zu erkennen.'
  ];
}
