import { ChangeDetectorRef, Component } from '@angular/core';
import { Esercizio } from './models/esercizio-model';
import { map, Observable, tap } from 'rxjs';
import { EsercizioService } from './service/esercizio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../macchinario/services/macchinario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmation } from '../../modale/modale';

@Component({
  selector: 'app-esercizi',
  standalone: false,
  templateUrl: './esercizi.html',
  styleUrl: './esercizi.css'
})
export class Esercizi {

  esercizi$!: Observable<Esercizio[]>

  totalElements = 0;
  totalPages = 0;
  currentPage = 0;
  size = 5;
  sort = 'name,asc';

  constructor(
    private esercizioService: EsercizioService,
    private router: Router,
    private acroute: ActivatedRoute,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef) { };

  ngOnInit(): void {
    this.loadEsercizi();
  }

  goToCreate() {
    this.router.navigate(['./details'], { relativeTo: this.acroute });
  }

  goToDetail(id: number) {
    this.router.navigate(['./details', id], { relativeTo: this.acroute });
  }

  goToExerciseDetails() {
    this.router.navigate(['./dettagli-esercizio'], { relativeTo: this.acroute });
  }

  private loadEsercizi(): void {
    this.esercizi$ = this.esercizioService
      .get$({
        page: this.currentPage,
        size: this.size,
        sort: this.sort
      })
      .pipe(
        // aggiorniamo info di paginazione
        tap((page: Page<Esercizio>) => {
          this.totalPages = page.totalPages;
          this.totalElements = page.totalElements;
        }),
        // ritorniamo solo i contenuti per l’*ngFor
        map((page: Page<Esercizio>) => page.content)
      );
  }

  deleteEsercizio(id: number) {
    // 2️⃣ Apre la modale di conferma
    const modalRef = this.modalService.open(ModalConfirmation);
    // 3️⃣ Gestisce il risultato della modale
    modalRef.result.then(
      (confirmed) => {
        if (confirmed) {
          // ✅ L'utente ha cliccato "Procedi" → elimina l'elemento
          this.esercizioService.delete$(id).subscribe(() => {
            this.loadEsercizi(); // ricarica la lista aggiornata
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
      this.loadEsercizi();
    }
  }

  paginaSuccessiva(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadEsercizi();
    }
  }

  // 🔹 Torna alla Home
  tornaHome(): void {
    this.router.navigate(['../home']);
  }

}



