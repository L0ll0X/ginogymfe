import { ChangeDetectorRef, Component } from '@angular/core';
import { EsercizioScheda } from './models/esercizio-scheda-utente.model';
import { map, Observable, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EsercizioSchedaService } from './service/esercizio-scheda.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmation } from '../../../modale/modale';
import { Page } from '../../macchinario/services/macchinario.service';




@Component({
  selector: 'app-esercizi-scheda',
  standalone: false,
  templateUrl: './esercizi-scheda.html',
  styleUrl: './esercizi-scheda.css'
})
export class EserciziScheda {

  eserciziScheda$!: Observable<EsercizioScheda[]>
  schedaId: number | undefined; 

  totalElements = 0;
  totalPages = 0;
  page = 0;
  size = 15;
  sort = 'id,asc';

  constructor(
    private esercizioSchedaService: EsercizioSchedaService,
    private router: Router,
    private acroute: ActivatedRoute,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef) { };

  ngOnInit(): void {
    this.acroute.paramMap.pipe(
      map(params => {
        const idParam = params.get('id');
        if (!idParam) {
          console.error("ID della Scheda non trovato nell'URL.");
          return null; // Restituisce null se l'ID non è presente
        }
        this.schedaId = +idParam;
        return this.schedaId;
      }),
      switchMap(schedaId => {
        if (schedaId && schedaId > 0) {
          return this.loadEserciziSchedaBySchedaId(schedaId);
        }

        return new Observable<EsercizioScheda[]>(observer => {
          observer.next([]);
          observer.complete();
        }
);
      })
    ).subscribe(esercizi => {
      this.eserciziScheda$ = new Observable<EsercizioScheda[]>(observer => {
        observer.next(esercizi);
        observer.complete();
      });
    });
  }

  private loadEserciziSchedaBySchedaId(schedaId: number): Observable<EsercizioScheda[]> {
    return this.esercizioSchedaService.getBySchedaId$({
      schedaId: schedaId,
      page: this.page,
      size: this.size,
      sort: this.sort
    }).pipe(
      map((eserciziSchedaPage: Page<EsercizioScheda>) => {
        this.totalElements = eserciziSchedaPage.totalElements;
        this.totalPages = eserciziSchedaPage.totalPages;
        return eserciziSchedaPage.content;
      })
    );
 }

  goToCreate() {
   this.router.navigate(['../../scheda-esercizi-details'], { relativeTo: this.acroute, queryParams: { schedaId: this.schedaId} });
  }

  goToDetail(id: number) {
    this.router.navigate(['../../scheda-esercizi-details', id], { relativeTo: this.acroute });
  }

  deleteEsercizio(id: number) {
    const modalRef = this.modalService.open(ModalConfirmation);
    // 3️⃣ Gestisce il risultato della modale
    modalRef.result.then(
      (confirmed) => {
        if (confirmed) {
          this.esercizioSchedaService.delete$(id).pipe(
            switchMap(() => this.loadEserciziSchedaBySchedaId(this.schedaId!))
          ).subscribe({
            next: (data) => {

              this.eserciziScheda$ = this.loadEserciziSchedaBySchedaId(this.schedaId!);
              this.cdr.detectChanges();
            },
            error: (err) => console.error("Errore durante l'eliminazione:", err)
          });
        }
      })

  }
}
