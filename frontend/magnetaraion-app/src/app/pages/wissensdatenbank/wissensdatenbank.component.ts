import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface KnowledgeArticle {
  title: string;
  category: string;
  summary: string;
}

@Component({
  selector: 'app-wissensdatenbank-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wissensdatenbank.component.html',
  styleUrls: ['./wissensdatenbank.component.scss']
})
export class WissensdatenbankComponent {
  public readonly articles: KnowledgeArticle[] = [
    {
      title: 'Release-Checkliste',
      category: 'Deployment',
      summary: 'Standardisiere deine Releases mit klaren Prüfpunkten für Code, Tests und Monitoring.'
    },
    {
      title: 'Onboarding-Guide für neue Entwickler:innen',
      category: 'Team',
      summary: 'Schritt-für-Schritt-Anleitung inklusive Tools, Prozesse und Kommunikationskanälen.'
    },
    {
      title: 'Incident-Management Playbook',
      category: 'Operations',
      summary: 'Definiere Verantwortlichkeiten und Kommunikationswege für kritische Störungen.'
    }
  ];
}
