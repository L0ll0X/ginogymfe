import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UtenteService } from './services/utente.service';
import { Utente } from './models/utenti.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmation } from '../../modale/modale';

@Component({
  selector: 'app-utenti',
  standalone: false,
  templateUrl: './utenti.html',
  styleUrls: ['./utenti.css']
})
export class UtentiComponent implements OnInit {
  utenti: Utente[] = [];
  utentiFiltrati: Utente[] = [];
  ruoloFiltro: string = 'Tutti';
  currentPage = 0;
  totalPages = 1;

  constructor(private utenteService: UtenteService, private modalService: NgbModal, private router: Router) {}

  ngOnInit(): void {
    this.caricaUtenti();
  }

  // 🔹 Carica lista utenti
  caricaUtenti(): void {
    this.utenteService.get$(this.currentPage, 10).subscribe({
      next: (res) => {
        this.utenti = res.content;
        this.totalPages = res.totalPages;
        this.filtraPerRuolo();
      },
      error: (err) => console.error('Errore nel caricamento utenti:', err)
    });
  }

  // 🔹 Filtra per ruolo
  filtraPerRuolo(): void {
    if (this.ruoloFiltro === 'Tutti') {
      this.utentiFiltrati = this.utenti;
    } else {
      this.utentiFiltrati = this.utenti.filter(u => u.role === this.ruoloFiltro);
    }
  }

  // 🔹 Naviga a "Aggiungi Utente"
  vaiAggiungi(): void {
    this.router.navigate(['/utenti/aggiungi']);
  }

  // 🔹 Naviga a "Modifica Utente"
  vaiModifica(id: number): void {
    this.router.navigate(['/utenti/aggiungi', id]);
  }

  // 🔹 Elimina utente
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
      this.caricaUtenti();
    }
  }

  paginaSuccessiva(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.caricaUtenti();
    }
  }

  // 🔹 Torna alla Home
  tornaHome(): void {
    this.router.navigate(['/home']);
  }
}
