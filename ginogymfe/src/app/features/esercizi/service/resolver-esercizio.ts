import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Esercizio } from '../models/esercizio-model';
import { EsercizioService } from './esercizio.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EsercizioResolver implements Resolve<Esercizio> {

  constructor(private esercizioService: EsercizioService) {}
  
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Esercizio> {
      const esercizioId = route.paramMap.get('id');
      
      if (!esercizioId) {
        return of(new Esercizio()); // Oppure null / throw error, dipende dalla tua logica
      }
  
      return this.esercizioService.getEsercizioById$(+esercizioId);
    }
  
}
