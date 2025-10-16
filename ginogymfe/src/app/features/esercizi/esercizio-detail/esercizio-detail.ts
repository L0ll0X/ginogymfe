import { Component, OnInit } from '@angular/core';
import { EsercizioService } from '../service/esercizio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Esercizio } from '../models/esercizio-model';
import { ModificaEsercizio } from '../models/modifica-esercizio.model';
import { CreaEsercizio } from '../models/crea-esercizio.model';
import { tap } from 'rxjs';
import { GruppoMuscolareService } from '../../gruppi-muscolari/service/gruppo-muscolare.service';
import { SelectItem } from '../../../select-item.model';
import { GruppoMuscolare } from '../../gruppi-muscolari/models/gruppo-muscolare';
import { MacchinarioService } from '../../macchinario/services/macchinario.service';
import { Macchinario } from '../../macchinario/models/macchinario.model';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './esercizio-detail.html',
  styleUrl: './esercizio-detail.css'
})
export class EsercizioDetails implements OnInit {

  esercizio!: Esercizio;
  gruppi: SelectItem[] = []; 
  macchinari: SelectItem[] = [];
  constructor(
    private esercizioService: EsercizioService, 
    private gruppoMuscolareService: GruppoMuscolareService,
    private macchinarioService: MacchinarioService,
    private router: Router,
    private acRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.acRoute.data.pipe(
      tap(({esercizio}) =>{
        this.esercizio =esercizio;
      })
    ).subscribe();

    this.gruppoMuscolareService.getAll$().pipe(
      tap((gruppi: GruppoMuscolare[]) =>{
        this.gruppi = gruppi.map(x => new SelectItem({id: x.id, name:x.name}))
      })
    ).subscribe()

    this.macchinarioService.getAll$().pipe(
        tap((macchinari: Macchinario[]) =>{
          this.macchinari = macchinari.map(x => new SelectItem({id: x.id, name:x.nome}))
        })
      ).subscribe()
  }


  submit() {
    if (this.esercizio.id) {
      this.esercizioService.put$(new ModificaEsercizio({
        id: this.esercizio.id,
        name: this.esercizio.name,
      
      } as ModificaEsercizio)).subscribe({
        next: (response) => {
          console.log('Esercizio aggiornato:', response);
        },
        error: (err) => {
          console.error('Errore: ')
        }
      });
    } else {
      this.esercizioService.create$(new CreaEsercizio({
        name: this.esercizio.name,
      
      } as ModificaEsercizio)).subscribe({
        next: (response) => {
          console.log('Esercizio aggiunto:', response);
        },
        error: (err) => {
          console.error('Errore: ')
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['./esercizi']);
  }

}
