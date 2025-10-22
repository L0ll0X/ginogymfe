import { ChangeDetectorRef, Component } from '@angular/core';
import { Esercizio } from './models/esercizio-model';
import { Observable } from 'rxjs';
import { EsercizioService } from './service/esercizio.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-esercizi',
  standalone: false,
  templateUrl: './esercizi.html',
  styleUrl: './esercizi.css'
})
export class Esercizi {


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

  deleteEsercizio(id: number) {
  if (confirm('Sei sicuro di voler eliminare questo esercizio?')) {
    this.esercizioService.delete$(id).subscribe({
      next: () => {
      console.log(`Esercizio ${id} eliminato`);
      },
      error: err => console.error('Errore eliminazione', err)
    });
  }
  }

}
