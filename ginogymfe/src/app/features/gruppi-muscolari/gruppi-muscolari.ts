import { Component } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { GruppoMuscolare } from './models/gruppo-muscolare';
import { GruppoMuscolareService } from './service/gruppo-muscolare.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../macchinario/services/macchinario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmation } from '../../modale/modale';

@Component({
  selector: 'app-gruppi-muscolari',
  standalone: false,
  templateUrl: './gruppi-muscolari.html',
  styleUrl: './gruppi-muscolari.css'
})
export class GruppiMuscolari {

  gruppiMuscolari$!: Observable<GruppoMuscolare[]>;

  totalElements = 0;
  totalPages = 0;
  currentPage = 0;
  size = 10;
  sort = 'name,asc';
  
  constructor(
    private gruppoMuscolareService: GruppoMuscolareService,
    private router: Router,
    private modalService: NgbModal,
    private acroute: ActivatedRoute) { };

  ngOnInit(): void {
        this.loadGruppiMuscolari();
  }

  goToCreate() {
    this.router.navigate(['./details'], { relativeTo: this.acroute });
  }

  goToDetail(id: number) {
    this.router.navigate(['./details', id], { relativeTo: this.acroute });
  }

  private loadGruppiMuscolari(): void {
    this.gruppiMuscolari$ = this.gruppoMuscolareService
      .get$({
        page: this.currentPage,
        size: this.size,
        sort: this.sort
      })
      .pipe(
        // aggiorniamo info di paginazione
        tap((page: Page<GruppoMuscolare>) => {
          this.totalPages = page.totalPages;
          this.totalElements = page.totalElements;
        }),
        // ritorniamo solo i contenuti per l’*ngFor
        map((page: Page<GruppoMuscolare>) => page.content)
      );
  }
  
  deleteGruppoMuscolare(id: number) {
    //apre la modale
      // 2️⃣ Apre la modale di conferma
  const modalRef = this.modalService.open(ModalConfirmation);

  // 3️⃣ Gestisce il risultato della modale
  modalRef.result.then(
    (confirmed) => {
      if (confirmed) {
        // ✅ L'utente ha cliccato "Procedi" → elimina l'elemento
        this.gruppoMuscolareService.delete$(id).subscribe(() => {
          this.loadGruppiMuscolari(); // ricarica la lista aggiornata
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
    this.loadGruppiMuscolari(); // ⬅️ Usa qui il metodo che ricarica i gruppi muscolari
  }
}

paginaSuccessiva(): void {
  if (this.currentPage < this.totalPages - 1) {
    this.currentPage++;
    this.loadGruppiMuscolari(); // ⬅️ idem
  }
}

// 🔹 Torna alla Home
tornaHome(): void {
  this.router.navigate(['../home']);
}

  
}



