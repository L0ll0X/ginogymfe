import { ChangeDetectorRef, Component } from '@angular/core';
import { EsercizioScheda } from './models/esercizio-scheda.model';
import { Observable, tap } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { EsercizioSchedaService } from './service/esercizio-scheda.service';

@Component({
  selector: 'app-esercizi-scheda',
  standalone: false,
  templateUrl: './esercizi-scheda.html',
  styleUrl: './esercizi-scheda.css'
})
export class EserciziScheda {

  eserciziScheda$!: Observable<EsercizioScheda[]>

  totalElements = 0;
  totalPages = 0;
  page = 0;
  size = 15;
  sort = '';

  constructor(
    private esercizioSchedaService: EsercizioSchedaService,
    private router: Router,
    private acroute: ActivatedRoute,
    private cdr: ChangeDetectorRef) { };

  ngOnInit(): void {
    this.eserciziScheda$ = this.esercizioSchedaService.eserciziScheda$;
    this.esercizioSchedaService.get$({ page: this.page, size: this.size, sort: this.sort }).subscribe();
  }

  goToCreate() {
    this.router.navigate(['./scheda-esercizi-details'], { relativeTo: this.acroute });
  }

  goToDetail(id: number) {
    this.router.navigate(['./details', id], { relativeTo: this.acroute });
  }

  

  deleteEsercizio(id: number) {
    if (confirm('Sei sicuro di voler eliminare questo esercizio dalla?')) {
      this.esercizioSchedaService.delete$(id).subscribe({
        next: () => {
          console.log(`EsercizioScheda ${id} eliminato`);
        },
        error: err => console.error('Errore eliminazione', err)
      });
    }
  }

}

