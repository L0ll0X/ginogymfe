import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { GruppoMuscolare } from '../models/gruppo-muscolare';
import { GruppoMuscolareService } from './gruppo-muscolare.service';

@Injectable({
  providedIn: 'root'
})
export class GruppoMuscolareResolver implements Resolve<GruppoMuscolare> {

  constructor(private gruppoMuscolareService: GruppoMuscolareService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GruppoMuscolare> {
    const gruppoMuscolareId = route.paramMap.get('id');
    
    if (!gruppoMuscolareId) {
      return of(new GruppoMuscolare()); 
    }

    
    return this.gruppoMuscolareService.getById$(+gruppoMuscolareId);
  }
}
