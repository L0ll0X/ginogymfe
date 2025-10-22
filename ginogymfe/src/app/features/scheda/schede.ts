import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SchedaModel } from './models/scheda.model';
import { SchedaService } from './services/scheda.service';
import { BehaviorSubject, map, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmation } from '../../modale/modale';
import { Page } from '../macchinario/services/macchinario.service';

@Component({
  standalone:false,
  selector: 'app-scheda',
  templateUrl: './schede.html',
  styleUrls: ['./schede.css']
})
export class Schede implements OnInit {
  scheda = new SchedaModel();

 schedeSubject = new BehaviorSubject<SchedaModel[]>([]);
  get schede$() { return this.schedeSubject.asObservable() }

  totalElements = 0;
  totalPages = 0;
  page = 0;
  size = 15;
  sort = 'name,asc';

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
      this.schedaService.get$({ page: this.page, size: this.size, sort: this.sort }).pipe(
        map((schede: Page<SchedaModel>) => {
          return schede.content
        }),
        tap((schede: SchedaModel[]) => {
          this.schedeSubject.next(schede);
        })
      ).subscribe();
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

  // deleteScheda(id: number): void {
  //   this.SchedaService.delete$(id).subscribe({
  //     next: () => {
  //     console.log(`Scheda ${id} eliminata`);
  //     },
  //     error: err => console.error('Errore eliminazione', err)
  //   });
  // }

  goToEserciziScheda(){
    this.router.navigate(['./eserciziScheda'], { relativeTo: this.acroute });
  }
}



