import { Component } from '@angular/core';
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

  constructor(
    private esercizioService: EsercizioService,
    private router: Router,
    private acroute: ActivatedRoute) { };

  ngOnInit(): void {
    // this.esercizi$ = this.esercizioService.get$();
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
  
  deleteEsercizio(id: number): void {
    this.esercizioService.delete$(id).subscribe({
      next: () => {
        console.log(`Esercizio ${id} eliminato`);
      },
      error: err => console.error('Errore eliminazione', err)
    });
  }

}
