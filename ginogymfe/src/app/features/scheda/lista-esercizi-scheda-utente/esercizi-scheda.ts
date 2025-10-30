import { ChangeDetectorRef, Component } from '@angular/core';
import { EsercizioScheda } from './models/esercizio-scheda-utente.model';
import { map, Observable, startWith, Subject, switchMap, tap } from 'rxjs';
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
  schedaId!: number; 

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

private reloadSubject = new Subject<void>(); 

  ngOnInit(): void {
    // Collega l'Observable della rotta con il Subject di ricaricamento
    this.eserciziScheda$ = this.acroute.paramMap.pipe(
      map(params => {
          const idParam = params.get('id');
          if (!idParam) {
              console.error(" ID della Scheda non trovato nell'URL.");
              return null;
          }
          this.schedaId = +idParam;
          return this.schedaId;
      }),
      switchMap(schedaId => 
          this.reloadSubject.pipe(
              startWith(undefined), // Fa partire subito la prima chiamata
              switchMap(() => {
                  if (schedaId && schedaId > 0) {
                      // Chiama la funzione di caricamento che restituisce l'Observable
                      return this.loadEserciziSchedaBySchedaId(schedaId);
                  } else {
                      // Ritorna un Observable vuoto
                      return new Observable<EsercizioScheda[]>(observer => {
                          observer.next([]);
                          observer.complete();
                      });
                  }
              })
          )
      )
    );
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


   deleteEsercizio(event: Event, id: number) {
    if (!id) return;
    
    // FIX Accessibilità: Rimuovi il focus dal pulsante cliccato
    const target = event.target as HTMLElement;
    // Risali all'elemento button se il target è l'icona <i>
    const buttonElement = target.closest('button');
    if (buttonElement) {
        buttonElement.blur(); 
    } else {
        target.blur(); 
    }


    const modalRef = this.modalService.open(ModalConfirmation);
    modalRef.result.then(
      (confirmed) => {
        if (confirmed) {
          this.esercizioSchedaService.delete$(id).subscribe({
            next: () => {
                // Innesca il ricaricamento dei dati in modo reattivo
                this.reloadSubject.next(); 
                this.router.navigate(['../../schede'])
            },
            error: (err) => {
                console.error("Errore durante l'eliminazione:", err);
                // La gestione dell'errore HTTP qui dipende dalla tua strategia,
                // ma per il 204 non dovresti vederla grazie al fix nel service.
            }
          });
        } else {
          console.log('Eliminazione annullata');
        }
      },
      (dismissed) => {
        console.log('Eliminazione annullata o modale chiusa');
      }
    );
  }
 
   

}
