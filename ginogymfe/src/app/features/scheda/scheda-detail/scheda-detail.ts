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
import { EsercizioScheda } from '../lista-esercizi-scheda-utente/models/esercizio-scheda-utente.model';
import { Esercizio } from '../../esercizi/models/esercizio-model';
import { CreaEsercizioScheda } from '../lista-esercizi-scheda-utente/models/crea-esercizio-scheda.model';
import { EsercizioSchedaRequest } from '../lista-esercizi-scheda-utente/models/esercizio-scheda-request.model';

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
        switchMap(({ scheda }) => {
          console.log('Scheda ricevuta dal resolver:', scheda);

          if (!scheda) {
            this.scheda = new SchedaModel({
              endDate: '',
              id: scheda?.id,
              startDate: '',
              userId: 0
            } as SchedaModel);
          } else {
            this.scheda = scheda;
          }
          return  this.schedaService.getExercisesByWorkoutPlanId$(this.scheda.id).pipe(
           tap((dettagli) =>{
            console.log(dettagli)
                this.eserciziScheda = dettagli as any;

           }) 
          )
        })
      ).subscribe();
  }

  bindSchedaEsercizio(schedaEsercizio: CreaEsercizioScheda) {
    this.eserciziScheda.push(
      new EsercizioSchedaRequest({
        exerciseId: schedaEsercizio.exerciseId,
        peso: 0,
        recupero: schedaEsercizio.recupero,
        serie: schedaEsercizio.serie,
        id: schedaEsercizio.workoutPlanId,
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
        .subscribe({
          next: () => {
            alert('Scheda creata con successo!');
            this.router.navigate(['/schede']);
          },
          error: (error) => {
            console.error('Creazione fallita', error);
            alert('Errore durante la creazione della scheda.');
          }
        });
    }
  }

  goBack(): void {
    window.history.back();
  }
}
