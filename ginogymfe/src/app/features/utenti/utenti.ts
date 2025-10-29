import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UtenteService } from './services/utente.service';
import { Utente } from './models/utenti.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Page } from '../macchinario/services/macchinario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmation } from '../../modale/modale';

@Component({
  selector: 'app-utenti',
  standalone: false,
  templateUrl: './utenti.html',
  styleUrls: ['./utenti.css']
})
export class UtentiComponent implements OnInit {
  private utentiSubject = new BehaviorSubject<Utente[]>([]);
  utenti$ = this.utentiSubject.asObservable();
  ruoloFiltro: string = 'Tutti';
  currentPage = 0;
  totalPages = 1;
  sort = 'id,asc';

  constructor(private utenteService: UtenteService, private modalService: NgbModal, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.utenteService
      .get$({
        page: this.currentPage,
        size: 10,
        sort: this.sort,
        role: this.ruoloFiltro !== 'Tutti' ? this.ruoloFiltro : undefined
      })
      .subscribe({
        next: (page: Page<Utente>) => {
          this.utentiSubject.next(page.content);
          this.totalPages = page.totalPages;
        },
        error: (err) => console.error('Errore caricamento utenti:', err)
      });
  }

  filtraPerRuolo(): void {
    this.currentPage = 0; // resetta la pagina quando cambi filtro
    this.load();
  }

  // 🔹 Paginazione
  paginaPrecedente(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.load();
    }
  }

  paginaSuccessiva(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.load();
    }
  }

  goToCreate(): void {
    this.router.navigate(['/utenti/detail']);
  }

  goToDetail(id: number): void {
    this.router.navigate(['/utenti/detail', id]);
  }

  // 🔹 Elimina utente
  delete(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questo utente?')) {
      this.utenteService.delete$(id).subscribe({
        next: () => {
          this.load();
        },
        error: (dismissed) => {
          // Chiusura tramite "Cross" o clic fuori dalla modale
          console.log('Eliminazione annullata');
        }
      })
    }
  }

// 🔹 Torna alla Home
  tornaHome(): void {
    this.router.navigate(['../home']);
  }

}
