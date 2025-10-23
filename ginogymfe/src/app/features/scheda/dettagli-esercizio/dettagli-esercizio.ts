import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EsercizioService } from '../../esercizi/service/esercizio.service';
import { DettaglioEsercizio } from './models/dettaglio-esercizio.model';

import { NgForm } from '@angular/forms';
import { DettaglioEsercizioService } from './service/dettaglio-esercizio.service';


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
export class DettagliEsercizio implements AfterViewInit{

   dettaglioEsercizio!: DettaglioEsercizio;
   @ViewChild('localForm') form!: NgForm; 

  // Evento di output che emette lo stato di validità al componente genitore
  @Output() validityChange = new EventEmitter<boolean>();

   
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


 ngAfterViewInit(): void {
    // Verifichiamo che il form sia disponibile prima di sottoscriverci
    if (this.form) {
        this.form.statusChanges?.subscribe(() => {
          // Quando lo stato del form cambia, emetti il nuovo stato di validità
           this.validityChange.emit(this.form.valid ?? false);
        });

        // Emetti lo stato iniziale. Usiamo un timeout per sicurezza.
        setTimeout(() => {
            this.validityChange.emit(this.form.valid ?? false);
        }, 0);
    }
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

