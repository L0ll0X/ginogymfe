import { Component, OnInit } from '@angular/core';
import { EsercizioService } from '../service/esercizio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Esercizio } from '../models/esercizio-model';
import { ModificaEsercizio } from '../models/modifica-esercizio.model';
import { CreaEsercizio } from '../models/crea-esercizio.model';
import { forkJoin, map, switchMap, tap } from 'rxjs';
import { GruppoMuscolareService } from '../../gruppi-muscolari/service/gruppo-muscolare.service';
import { SelectItem } from '../../../select-item.model';
import { GruppoMuscolare } from '../../gruppi-muscolari/models/gruppo-muscolare';
import { MacchinarioService, Page } from '../../macchinario/services/macchinario.service';
import { Macchinario } from '../../macchinario/models/macchinario.model';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './esercizio-detail.html',
  styleUrl: './esercizio-detail.css'
})
export class EsercizioDetails implements OnInit {

  esercizio!:Esercizio;
  gruppi: GruppoMuscolare[] = [];
  macchinari: Macchinario[] = [];
  macchinarioIdSelected: number = 0;
  gruppoIdSelected: number = 0;

   totalElements = 0;
  totalPages = 0;
  page = 0;
  size = 15;
  sort = 'name,asc';

  constructor(
    private esercizioService: EsercizioService, 
    private gruppoMuscolareService: GruppoMuscolareService,
    private macchinarioService: MacchinarioService,
    private router: Router,
    private acRoute: ActivatedRoute
  ) {
    this.esercizio = {} as Esercizio;
  }

  ngOnInit(): void {
    this.acRoute.data.pipe(
      tap(({esercizio}) =>{
        this.esercizio =esercizio;
      }),
      switchMap((_) => this.gruppoMuscolareService.get$({ page: this.page, size: this.size, sort: this.sort }).pipe(
      tap((gruppi: Page<GruppoMuscolare>) =>{
        this.gruppi = gruppi.content.map(x => new SelectItem({id: x.id, name:x.name}))
      })
    ))
    ).subscribe();
    this.macchinarioService.get$({ page: this.page, size: this.size, sort: this.sort }).pipe(
        tap((macchinari: Page<Macchinario>) =>{
          this.macchinari = macchinari.content.map(x => new SelectItem({id: x.id, name:x.name, description:x.description}))
        })
      ).subscribe()
  }


  selectMachine(option: any){
    this.macchinarioIdSelected = option
  }

  selectGroup(option: any){
    this.gruppoIdSelected = option
  }


  submit() {
    if (this.esercizio.id) {
      this.esercizioService.put$(new ModificaEsercizio({
        id: this.esercizio.id,
        name: this.esercizio.name,
        muscleGroupId: this.gruppoIdSelected,
        machineId: this.macchinarioIdSelected
      } as ModificaEsercizio)).subscribe({
        next: (response) => {
          console.log('Esercizio aggiornato:', response);
          this.router.navigate(['esercizi']);
        },
        error: (err) => {
          console.error('Errore: ', err)
        }
      });
    } else {
      this.esercizioService.create$(new CreaEsercizio({
        name: this.esercizio.name,
        muscleGroupId: this.gruppoIdSelected,
        machineId: this.macchinarioIdSelected
      } as CreaEsercizio)).subscribe({
        next: (response) => {
          console.log('Esercizio aggiunto:', response);
          this.router.navigate(['esercizi']);
        },
        error: (err) => {
          console.error('Errore: ', err)
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['./esercizi']);
  }

}
