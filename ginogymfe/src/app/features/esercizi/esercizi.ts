import { ChangeDetectorRef, Component } from '@angular/core';
import { Esercizio } from './models/esercizio-model';
import { map, Observable } from 'rxjs';
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
paginaSuccessiva() {
throw new Error('Method not implemented.');
}
currentPage =0;
paginaPrecedente() {
throw new Error('Method not implemented.');
}


  esercizi$!: Observable<Esercizio[]>

  totalElements = 0;
  totalPages = 0;
  page = 0;
  size = 15;
  sort = 'name,asc';

  constructor(
    private esercizioService: EsercizioService,
    private router: Router,
    private acroute: ActivatedRoute,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef) { };

  ngOnInit(): void {
    this.esercizioService.get$({ page: this.page, size: this.size, sort: this.sort }).subscribe(()=> {
    this.cdr.detectChanges();
  });
    this.esercizi$ = this.esercizioService.esercizi$;
  }

  goToCreate() {
    this.router.navigate(['./details'], { relativeTo: this.acroute });
  }

  goToDetail(id: number) {
    this.router.navigate(['./details', id], { relativeTo: this.acroute });
  }

  goToExerciseDetails(){
    this.router.navigate(['./dettagli-esercizio'],{ relativeTo: this.acroute });
  }

  private loadEsercizi() {
      this.esercizi$ = this.esercizioService.get$({ page: this.page, size: this.size, sort: this.sort }).pipe(
        map((esercizi: Page<Esercizio>) => {
          return esercizi.content
        })
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
   
}



