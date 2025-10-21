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

  gruppiMuscolariSubject = new BehaviorSubject<GruppoMuscolare[]>([]);
  get gruppiMuscolari$() { return this.gruppiMuscolariSubject.asObservable() }


  totalElements = 0;
  totalPages = 0;
  page = 0;
  size = 15;
  sort = 'name,asc';
  constructor(
    private gruppoMuscolareService: GruppoMuscolareService,
    private router: Router,
    private modalService: NgbModal,
    private acroute: ActivatedRoute) { };

  ngOnInit(): void {
    this.loadGruppiMuscolari();
  }

  private loadGruppiMuscolari() {
    this.gruppoMuscolareService.get$({ page: this.page, size: this.size, sort: this.sort }).pipe(
      map((gruppi: Page<GruppoMuscolare>) => {
        return gruppi.content
      }),
      tap((gruppi: GruppoMuscolare[]) => {
        this.gruppiMuscolariSubject.next(gruppi);
      })
    ).subscribe();
  }

  goToCreate() {
    this.router.navigate(['./details'], { relativeTo: this.acroute });
  }

  goToDetail(id: number) {
    this.router.navigate(['./details', id], { relativeTo: this.acroute });
  }
  
  deleteGruppoMuscolare(id: number) {
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

}
