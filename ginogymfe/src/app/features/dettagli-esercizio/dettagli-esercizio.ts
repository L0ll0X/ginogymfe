import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DettaglioEsercizioService } from './service/dettaglio-esercizio.service';

import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from '../../select-item.model';
import { EsercizioService } from '../esercizi/service/esercizio.service';
import { Esercizio } from '../esercizi/models/esercizio-model';
import { DettaglioEsercizio } from './models/dettaglio-esercizio.model';
import { Page } from '../macchinario/services/macchinario.service';

export const GiorniSettimana = [
{ id: 1, nome: 'Lunedì' },
{ id: 2, nome: 'Martedì' },
{ id: 3, nome: 'Mercoledì' },
{ id: 4, nome: 'Giovedì' },
{ id: 5, nome: 'Venerdì' },
{ id: 6, nome: 'Sabato' },
{ id: 7, nome: 'Domenica' }
];

@Component({
  selector: 'app-dettagli-esercizio',
  standalone: false,
  templateUrl: './dettagli-esercizio.html',
  styleUrl: './dettagli-esercizio.css'
})
export class DettagliEsercizio {

   dettaglioEsercizio!: DettaglioEsercizio;
   
    constructor(
      private dettaglioEsercizioService: DettaglioEsercizioService, 
      private esercizioService: EsercizioService,
      private router: Router,
      private acRoute: ActivatedRoute
    ) {
      this.dettaglioEsercizio = {} as DettaglioEsercizio;
    }

 ngOnInit(): void {
     this.acRoute.data.pipe(
       tap(({dettaglioEsercizio}) =>{
        if (dettaglioEsercizio) {
         this.dettaglioEsercizio =dettaglioEsercizio;
        }
       })
     ).subscribe();
   }

goBack() {
    this.router.navigate(['../esercizi-scheda']);
}


submit(){
if (this.dettaglioEsercizio.id) {
      this.dettaglioEsercizioService.put$(this.dettaglioEsercizio).subscribe({
        next: (response) => {
          console.log('DettaglioEsercizio aggiornato:', response);
          this.router.navigate(['../eserciziScheda']);
        },
        error: (err) => {
          console.error('Errore: ')
        }
      });
    } else {
      this.dettaglioEsercizioService.create$(this.dettaglioEsercizio).subscribe({
        next: (response) => {
          console.log('DettaglioEsercizio aggiunto:', response);
          this.router.navigate(['../eserciziScheda']);
        },
        error: (err) => {
          console.error('Errore: ')
        }
      });
    }
  }
  
}

