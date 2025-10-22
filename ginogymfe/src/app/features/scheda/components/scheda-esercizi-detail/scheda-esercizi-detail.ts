import { Component } from '@angular/core';
import { EsercizioScheda } from '../esercizi-scheda/models/esercizio-scheda.model';
import { Esercizio } from '../../../esercizi/models/esercizio-model';
import { SchedaModel } from '../../models/scheda.model';
import { EsercizioSchedaService } from '../esercizi-scheda/service/esercizio-scheda.service';
import { SchedaService } from '../../services/scheda.service';
import { EsercizioService } from '../../../esercizi/service/esercizio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Page } from '../../../macchinario/services/macchinario.service';
import { SelectItem } from '../../../../select-item.model';
import { ModificaEsercizioScheda } from '../esercizi-scheda/models/modifica-esercizio-scheda.model';
import { CreaEsercizioScheda } from '../esercizi-scheda/models/crea-esercizio-scheda.model';

@Component({
  selector: 'app-scheda-esercizi-detail',
  standalone: false,
  templateUrl: './scheda-esercizi-detail.html',
  styleUrl: './scheda-esercizi-detail.css'
})
export class SchedaEserciziDetail {

  esercizioScheda!: EsercizioScheda;
  esercizi: Esercizio[] = [];
  schede: SchedaModel[] = [];
  esercizioIdSelected!: number;
  schedaIdSelected!: number;

  totalElements = 0;
  totalPages = 0;
  page = 0;
  size = 15;
  sort = 'name,asc';

  constructor(
    private esercizioSchedaService: EsercizioSchedaService, 
    private schedaService: SchedaService,
    private esercizioService: EsercizioService,
    private router: Router,
    private acRoute: ActivatedRoute
  ) {
    this.esercizioScheda = {} as EsercizioScheda;
  }

   ngOnInit(): void {
      this.acRoute.data.pipe(
        tap(({esercizioScheda}) =>{
          this.esercizioScheda =esercizioScheda;
          this.esercizioIdSelected = esercizioScheda.exercise?.id ?? 0;
          this.schedaIdSelected = esercizioScheda.scheda?.id ?? 0;
        }),
        switchMap((_) => this.esercizioService.get$({ page: this.page, size: this.size, sort: this.sort }).pipe(
        tap((esercizi: Page<Esercizio>) =>{
          this.esercizi = esercizi.content.map(x => new SelectItem({id: x.id, name:x.name, machine:x.machine, muscleGroup:x.muscleGroup}))
        })
      ))
      ).subscribe();
      this.schedaService.get$({ page: this.page, size: this.size, sort: this.sort }).pipe(
        tap((schede: Page<SchedaModel>) =>{
          this.schede = schede.content.map(x => new SelectItem({id: x.id, userId:x.userId, startDate:x.startDate, endDate:x.endDate}))
        })
      ).subscribe();
    }

    selectExercise(option: any){
    this.esercizioIdSelected = option
  }

   selectScheda(option: any){
    this.schedaIdSelected = option
  }

 goToExerciseDetails() {
    this.router.navigate(['./dettagli-esercizio']);
  }

  submit() {
      if (this.esercizioScheda.id) {
        this.esercizioSchedaService.put$(new ModificaEsercizioScheda({
          id: this.esercizioScheda.id,
          idEsercizio: this.esercizioIdSelected,
          idScheda:this.schedaIdSelected
        } as ModificaEsercizioScheda)).subscribe({
          next: (response) => {
            console.log('Esercizio aggiornato:', response);
             this.router.navigate(['../../schede/esercizi-scheda']);
          },
          error: (err) => {
            console.error('Errore: ', err)
          }
        });
      } else {
        this.esercizioSchedaService.create$(new CreaEsercizioScheda({
        idEsercizio: this.esercizioIdSelected,
        idScheda:this.schedaIdSelected
        } as CreaEsercizioScheda)).subscribe({
          next: (response) => {
            console.log('Esercizio aggiunto:', response);
             this.router.navigate(['../../schede/esercizi-scheda']);
          },
          error: (err) => {
            console.error('Errore: ', err)
          }
        });
      }
    }
  
    goBack() {
      this.router.navigate(['../../schede/esercizi-scheda']);
    }

}
