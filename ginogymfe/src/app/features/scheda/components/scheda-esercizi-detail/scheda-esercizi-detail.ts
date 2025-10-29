
import { SchedaService } from '../../services/scheda.service';
import { EsercizioService } from '../../../esercizi/service/esercizio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, switchMap, tap } from 'rxjs';
import { Page } from '../../../macchinario/services/macchinario.service';
import { SelectItem } from '../../../../select-item.model';

import { DettaglioEsercizio } from '../../models/dettaglio-esercizio.model';
import { Component, Output, EventEmitter } from '@angular/core';
import { Esercizio } from '../../../esercizi/models/esercizio-model';
import { CreaEsercizioScheda } from '../../lista-esercizi-scheda-utente/models/crea-esercizio-scheda.model';
import { EsercizioSchedaService } from '../../lista-esercizi-scheda-utente/service/esercizio-scheda.service';

@Component({
  selector: 'app-scheda-esercizi-detail',
  standalone: false,
  templateUrl: './scheda-esercizi-detail.html',
  styleUrl: './scheda-esercizi-detail.css'
})
export class SchedaEserciziDetail {
  @Output() onSchedaDetailSubmitted = new EventEmitter<CreaEsercizioScheda>();

  dettagliEsercizioForm: any[] = [];
  dettaglioEsercizio!: DettaglioEsercizio;
  esercizi: Esercizio[] = [];
  esercizioIdSelected!: number;
  schedaIdSelected!: number | undefined
  isCollapsed = false;
  isSecondCollapsed = false;
  totalElements = 0;
  totalPages = 0;
  page = 0;
  size = 15;
  sort = '';

  constructor(
    private esercizioService: EsercizioService,
    private router: Router,
    private acRoute: ActivatedRoute
  ) {
    this.dettaglioEsercizio = new DettaglioEsercizio();
    this.dettagliEsercizioForm.push(this.dettaglioEsercizio)
  }

  getClass(): string{
    if(this.isCollapsed) return 'fa-solid fa-angle-up'
    else return 'fa-solid fa-angle-down'
  }

  ngOnInit(): void {
    this.esercizioService.get$({ page: this.page, size: this.size, sort: this.sort }).pipe(
      tap((esercizi: Page<Esercizio>) => {
        this.esercizi = esercizi.content.map(x => new SelectItem({ id: x.id, name: x.name, machine: x.machine, muscleGroup: x.muscleGroup }))
      })
    ).subscribe();
    this.acRoute.queryParamMap.pipe(
      tap((params) => {
        const schedaIdParam = params.get('id');
        if (schedaIdParam) {
          this.schedaIdSelected = +schedaIdParam;
        }
      })
    ).subscribe();

  }

  addNewEsercizioPanel(){
    this.dettagliEsercizioForm.push(new DettaglioEsercizio())
  }

  selectExercise(option: any) {
    this.esercizioIdSelected = option
  }

  selectScheda(option: any) {
    this.schedaIdSelected = option
  }

  submit(dettaglioEsercizio: DettaglioEsercizio) {
    if (this.schedaIdSelected === 0) {
      console.error("Errore: ID Scheda non valido (0). Impossibile salvare o navigare.");
      return;
    }
    this.onSchedaDetailSubmitted.emit(new CreaEsercizioScheda({
      idEsercizio: this.esercizioIdSelected,  
      idWorkoutPlan: this.schedaIdSelected,
      peso: 0,
      recupero: dettaglioEsercizio.recupero,
      ripetizioni: dettaglioEsercizio.ripetizioni,
      serie:dettaglioEsercizio.serie
    } as CreaEsercizioScheda))
    this.isSecondCollapsed = true;
  }

  goBack() {
    this.router.navigate(['../schede']);
  }

}