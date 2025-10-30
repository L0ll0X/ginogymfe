import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UtenteService } from './services/utente.service';
import { Utente } from './models/utenti.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
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

  utenti$!: Observable<Utente[]>;

  totalElements = 0;
  totalPages = 0;
  currentPage = 0;
  size = 10;
  sort = 'name,asc';

  constructor(private utenteService: UtenteService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.loadUtenti();
  }

  private loadUtenti(): void {
      this.utenti$ = this.utenteService
        .get$({
          page: this.currentPage,
          size: this.size,
          sort: this.sort
        })
        .pipe(
          // aggiorniamo info di paginazione
          tap((page: Page<Utente>) => {
            this.totalPages = page.totalPages;
            this.totalElements = page.totalElements;
          }),
          // ritorniamo solo i contenuti per l’*ngFor
          map((page: Page<Utente>) => page.content)
        );
    }

  goToCreate(): void {
    this.router.navigate(['/utenti/detail']);
  }

  goToDetail(id: number): void {
    this.router.navigate(['/utenti/detail', id]);
  }

  //  Elimina utente
  delete(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questo utente?')) {
      this.utenteService.delete$(id).subscribe({
        next: () => {
          this.loadUtenti();
        },
        error: (dismissed) => {
          // Chiusura tramite "Cross" o clic fuori dalla modale
          console.log('Eliminazione annullata');
        }
      })
    }
  }

  // 🔹 Paginazione
  paginaPrecedente(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadUtenti();
    }
  }

  paginaSuccessiva(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadUtenti();
    }
  }

  // 🔹 Torna alla Home
  tornaHome(): void {
    this.router.navigate(['../home']);
  }

}
