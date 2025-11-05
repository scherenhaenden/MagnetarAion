import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ReportCard {
  title: string;
  description: string;
}

@Component({
  selector: 'app-berichte-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './berichte.component.html',
  styleUrls: ['./berichte.component.scss']
})
export class BerichteComponent {
  public readonly reportCards: ReportCard[] = [
    {
      title: 'Sprint-Leistungsbericht',
      description: 'Analysiere abgeschlossene Stories, verbleibende Aufgaben und Velocity-Trends pro Sprint.'
    },
    {
      title: 'Team-Auslastung',
      description: 'Beobachte, wie viele Stunden dein Team eingeplant hat und erkenne Überlastungen frühzeitig.'
    },
    {
      title: 'Ticket-Durchlaufzeit',
      description: 'Vergleiche die durchschnittliche Zeit vom Eingang bis zur Fertigstellung deiner Tickets.'
    }
  ];
}
