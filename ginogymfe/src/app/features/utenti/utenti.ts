import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UtenteService } from './services/utente.service';
import { Utente } from './models/utenti.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { map, Observable } from 'rxjs';
import { Page } from '../macchinario/services/macchinario.service';
=======
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmation } from '../../modale/modale';
>>>>>>> origin/develop_martina

@Component({
  selector: 'app-utenti',
  standalone: false,
  templateUrl: './utenti.html',
  styleUrls: ['./utenti.css']
})
export class UtentiComponent implements OnInit {
  utenti$!: Observable<Utente[]>
  ruoloFiltro: string = 'Tutti';
  currentPage = 0;
  totalPages = 1;
  sort = 'id,asc';

  constructor(private utenteService: UtenteService, private modalService: NgbModal, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.utenti$ = this.utenteService.get$({ page: this.currentPage, size: 10, sort:this.sort }).pipe(
      map((page: Page<Utente>) => page.content)
    )

  }

 

  goToCreate(): void {
    this.router.navigate(['/utenti/detail']);
  }

  goToDetail(id: number): void {
    this.router.navigate(['/utenti/detail', id]);
  }

  // 🔹 Elimina utente
<<<<<<< HEAD
  delete(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questo utente?')) {
      this.utenteService.delete$(id).subscribe({
        next: () => {
          alert('Utente eliminato con successo!');
          this.load();
=======
  eliminaUtente(id: number) {
    // 2️⃣ Apre la modale di conferma
    const modalRef = this.modalService.open(ModalConfirmation);
    // 3️⃣ Gestisce il risultato della modale
     modalRef.result.then(
        (confirmed) => {
        if (confirmed) {
          // ✅ L'utente ha cliccato "Procedi" → elimina l'elemento
          this.utenteService.delete$(id).subscribe(() => {
          this.caricaUtenti(); // ricarica la lista aggiornata
          });
        } else {
          // ⚠️ opzionale: log annullamento
          console.log('Eliminazione annullata');
        }
>>>>>>> origin/develop_martina
        },
        (dismissed) => {
          // Chiusura tramite "Cross" o clic fuori dalla modale
          console.log('Eliminazione annullata');
        }
    );
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

  // 🔹 Torna alla Home
  tornaHome(): void {
    this.router.navigate(['../home']);
  }
}
