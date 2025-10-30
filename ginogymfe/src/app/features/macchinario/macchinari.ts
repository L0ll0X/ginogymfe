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

  macchinari$!: Observable<Macchinario[]>;
  
  totalElements = 0;
  totalPages = 0;
  currentPage = 0;
  size = 5;
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

  private loadMacchinari(): void {
      this.macchinari$ = this.macchinarioService
        .get$({
          page: this.currentPage,
          size: this.size,
          sort: this.sort
        })
        .pipe(
          // aggiorniamo info di paginazione
          tap((page: Page<Macchinario>) => {
            this.totalPages = page.totalPages;
            this.totalElements = page.totalElements;
          }),
          // ritorniamo solo i contenuti per l’*ngFor
          map((page: Page<Macchinario>) => page.content)
        );
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
   // 🔹 Paginazione
  paginaPrecedente(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadMacchinari();
    }
  }

  paginaSuccessiva(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadMacchinari();
    }
  }

  // 🔹 Torna alla Home
  tornaHome(): void {
    this.router.navigate(['../home']);
  }

}


