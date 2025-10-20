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
    esercizi: SelectItem[] = []; 
    totalElements = 0;
    totalPages = 0;
    page = 0;
    size = 10;
    sort = 'name,asc';
   
    constructor(
      private dettaglioEsercizioService: DettaglioEsercizioService, 
      private esercizioService: EsercizioService,
      private router: Router,
      private acRoute: ActivatedRoute
    ) {
  
    }

 ngOnInit(): void {
     this.acRoute.data.pipe(
       tap(({dettaglioEsercizio}) =>{
         this.dettaglioEsercizio =dettaglioEsercizio;
       })
     ).subscribe();
 
     this.esercizioService.get$().pipe(
       tap((esercizi: Page<Esercizio>) =>{
         this.esercizi = esercizi.content.map(x => new SelectItem({id: x.id, name:x.name}))
       })
     ).subscribe()
   }

goBack() {
    this.router.navigate(['./esercizi']);
}


submit(){
if (this.dettaglioEsercizio.id) {
      this.dettaglioEsercizioService.put$(new DettaglioEsercizio({
        id: this.dettaglioEsercizio.id,
        serie: this.dettaglioEsercizio.serie,
        ripetizioni: this.dettaglioEsercizio.ripetizioni,
        recupero: this.dettaglioEsercizio.recupero,
      } as DettaglioEsercizio)).subscribe({
        next: (response) => {
          console.log('DettaglioEsercizio aggiornato:', response);
        },
        error: (err) => {
          console.error('Errore: ')
        }
      });
    } else {
      this.dettaglioEsercizioService.create$(new DettaglioEsercizio({
        serie: this.dettaglioEsercizio.serie,
        ripetizioni: this.dettaglioEsercizio.ripetizioni,
        recupero: this.dettaglioEsercizio.recupero,
      } as DettaglioEsercizio)).subscribe({
        next: (response) => {
          console.log('DettaglioEsercizio aggiunto:', response);
        },
        error: (err) => {
          console.error('Errore: ')
        }
      });
    }
  }
  
}

