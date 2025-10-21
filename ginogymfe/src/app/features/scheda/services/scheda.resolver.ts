import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SchedaModel } from '../models/scheda.model';
import { SchedaService } from './scheda.service';

@Injectable({
  providedIn: 'root'
})
export class SchedaResolver implements Resolve<SchedaModel> {

  constructor(private schedaService: SchedaService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SchedaModel> {
    const schedaId = route.paramMap.get('id');

    if (!schedaId) {
      return of(new SchedaModel()); // restituisce una Scheda vuota
    }

    return this.schedaService.getById(+schedaId); // usa il modello, non il componente
  }
}
