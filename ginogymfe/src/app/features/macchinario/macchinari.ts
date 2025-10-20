import { Component, OnInit } from '@angular/core';
import { MacchinarioService, Page} from './services/macchinario.service';
import { Macchinario } from './models/macchinario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmation } from '../../modale/modale';

@Component({
  selector: 'app-macchinario',
  standalone:false,
  templateUrl: './macchinari.html',
  styleUrl: './macchinari.css'
})
export class Macchinari implements OnInit {

  macchinariSubject = new BehaviorSubject<Macchinario[]>([]);
  get macchinari$() { return this.macchinariSubject.asObservable() }

  totalElements = 0;
  totalPages = 0;
  page = 0;
  size = 10;
  sort = 'name,asc';

  constructor(
    private macchinarioService: MacchinarioService,
    private modalService: NgbModal,
    private router: Router,
    private acroute: ActivatedRoute
 ) { }

  ngOnInit(): void {
    this.loadMacchinari();

  }

  private loadMacchinari() {
      this.macchinarioService.get$({ page: this.page, size: this.size, sort: this.sort }).pipe(
        map((macchinari: Page<Macchinario>) => {
          return macchinari.content
        }),
        tap((macchinari: Macchinario[]) => {
          this.macchinariSubject.next(macchinari);
        })
      ).subscribe();
  }

  goToCreate() {
    this.router.navigate(['./details'], { relativeTo: this.acroute });
  }

  goToDetail(id: number) {
    this.router.navigate([`./details/${id}`], { relativeTo: this.acroute });
  }

  deleteMacchinario(id: number) {
    // 2️⃣ Apre la modale di conferma
    const modalRef = this.modalService.open(ModalConfirmation);
  
    // 3️⃣ Gestisce il risultato della modale
    modalRef.result.then(
      (confirmed) => {
        if (confirmed) {
          // ✅ L'utente ha cliccato "Procedi" → elimina l'elemento
          this.macchinarioService.delete$(id).subscribe(() => {
            this.loadMacchinari(); // ricarica la lista aggiornata
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

  // deleteMacchinario(id: number): void {
  //   this.macchinarioService.delete$(id).subscribe({
  //     next: () => {
  //     console.log(`Macchinario ${id} eliminato`);
  //     },
  //     error: err => console.error('Errore eliminazione', err)
  //   });
  // }
}


