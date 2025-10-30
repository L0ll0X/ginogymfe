import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SchedaModel } from './models/scheda.model';
import { SchedaService } from './services/scheda.service';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmation } from '../../modale/modale';
import { Page } from '../macchinario/services/macchinario.service';

@Component({
  standalone: false,
  selector: 'app-scheda',
  templateUrl: './schede.html',
  styleUrls: ['./schede.css']
})
export class Schede implements OnInit {

  schede$!: Observable<SchedaModel[]>;

  totalElements = 0;
  totalPages = 0;
  currentPage = 0;
  size = 5;
  sort = 'startDate,asc';

  constructor(
    private schedaService: SchedaService,
    private modalService: NgbModal,
    private router: Router,
    private acroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadSchede();

  }

  private loadSchede() {
    this.schede$ = this.schedaService
      .get$({
        page: this.currentPage,
        size: this.size,
        sort: this.sort
      })
      .pipe(
        // aggiorniamo info di paginazione
        tap((page: Page<Schede>) => {
          this.totalPages = page.totalPages;
          this.totalElements = page.totalElements;
        }),
        // ritorniamo solo i contenuti per l’*ngFor
        map((page: Page<Schede>) => page.content)
      );
  }

  goToCreate() {
    this.router.navigate(['./detail'], { relativeTo: this.acroute });
  }

  goToDetail(id?: number) {
    if (!id) return;
    this.router.navigate([`./detail/${id}`], { relativeTo: this.acroute });
  }

  deleteScheda(id?: number) {
    if (!id) return;
    //  Apre la modale di conferma
    const modalRef = this.modalService.open(ModalConfirmation);

    //  Gestisce il risultato della modale
    modalRef.result.then(
      (confirmed) => {
        if (confirmed) {
          //  L'utente ha cliccato "Procedi" → elimina l'elemento
          this.schedaService.delete$(id).subscribe(() => {
            this.loadSchede(); // ricarica la lista aggiornata
          });
        } else {
          // opzionale: log annullamento
          console.log('Eliminazione annullata');
        }
      },
      (dismissed) => {
        // Chiusura tramite "Cross" o clic fuori dalla modale
        console.log('Eliminazione annullata');
      }
    );
  }

  goToEserciziScheda(id: number) {
    this.router.navigate(['esercizi-scheda', id], { relativeTo: this.acroute });
  }

  // 🔹 Paginazione
  paginaPrecedente(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadSchede(); // ⬅️ Usa qui il metodo che ricarica i gruppi muscolari
    }
  }

  paginaSuccessiva(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadSchede(); // ⬅️ idem
    }
  }

  // 🔹 Torna alla Home
  tornaHome(): void {
    this.router.navigate(['../home']);
  }

}


