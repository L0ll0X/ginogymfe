import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import {
  SchedaModel,
  CreateSchedaWithDetailRequest,
  CreateSchedaWithDetailRequest as ModifySchedaWithDetailRequest
} from '../models/scheda.model';
import { SchedaService } from '../services/scheda.service';
import { Utente } from '../../utenti/models/utenti.model';
import { UtenteService } from '../../utenti/services/utente.service';
import { CreaEsercizioScheda } from '../lista-esercizi-scheda-utente/models/crea-esercizio-scheda.model';
import { EsercizioSchedaRequest } from '../lista-esercizi-scheda-utente/models/esercizio-scheda-request.model';
import { of } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-scheda-detail',
  templateUrl: './scheda-detail.html',
  styleUrls: ['./scheda-detail.css']
})
export class SchedaDetail implements OnInit {
  scheda!: SchedaModel;
  utenti: Utente[] = [];
  eserciziScheda: EsercizioSchedaRequest[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private schedaService: SchedaService,
    private utenteService: UtenteService
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        tap(({ scheda }) => { 
          if (!scheda) {
            this.scheda = new SchedaModel({ /* ... nuova scheda ... */ } as SchedaModel);
          } else {
            this.scheda = scheda;
          }
        }),
        switchMap(() => {
          if (!this.scheda.id) {
            console.log("Nuova scheda, nessun ID, non carico esercizi.");
            return of([]); 
          }
          if (this.scheda.id && this.scheda. exerciseDetails && this.scheda.exerciseDetails.length > 0) {
            console.log("Esercizi già caricati dal Resolver.");
            return of(this.scheda.exerciseDetails);
          }
          return this.schedaService.getExercisesByWorkoutPlanId$(this.scheda.id);
        }),
        tap((dettagli) => {
          console.log('Dettagli esercizi ricevuti:', dettagli);
          this.eserciziScheda = dettagli as any;
        })
      ).subscribe();

  }

  bindSchedaEsercizio(schedaEsercizio: CreaEsercizioScheda) {
    this.eserciziScheda.push(
      new EsercizioSchedaRequest({
        idEsercizio: schedaEsercizio.idEsercizio,
        peso: 0,
        recupero: schedaEsercizio.recupero,
        serie: schedaEsercizio.serie,         
        id: schedaEsercizio.idWorkoutPlan,
        ripetizioni: schedaEsercizio.ripetizioni
      } as EsercizioSchedaRequest)
    );
  }

  submit(): void {
    if (this.scheda.id) {      
      this.schedaService
        .put$(
          new ModifySchedaWithDetailRequest({
            endDate: this.scheda.endDate,
            startDate: this.scheda.startDate,
            userId: 0,
            exerciseDetails: this.eserciziScheda,
            id: this.scheda.id
          } as ModifySchedaWithDetailRequest)
        )
        .subscribe({
          next: () => {
            alert('Scheda aggiornata con successo!');
            this.router.navigate(['/schede']);
          },
          error: (error) => {
            console.error('Modifica fallita', error);
            alert('Errore durante la modifica della scheda.');
          }
        });
    } else {
      
      this.schedaService
        .create$(
          new CreateSchedaWithDetailRequest({
            endDate: this.scheda.endDate,
            startDate: this.scheda.startDate,
            userId: 0,
            exerciseDetails: this.eserciziScheda,
            id: this.scheda.id
          } as CreateSchedaWithDetailRequest)
        )
        .subscribe(x => this.router.navigate(['/schede']));
    }
  }

  goBack(): void {
    window.history.back();
  }
}
