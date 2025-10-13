import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { macchinarioService } from './macchinario.service';
import { Macchinario } from '../models/macchinario.model';


@Injectable({
  providedIn: 'root'
})
export class MacchinarioResolver implements Resolve<Macchinario> {

  constructor(private macchinarioService: macchinarioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Macchinario> {
    const macchinarioId = route.paramMap.get('id');
    
    if (!macchinarioId) {
      return of(new Macchinario()); // Oppure null / throw error, dipende dalla tua logica
    }

    return this.macchinarioService.getMacchinarioById$(+macchinarioId);
  }
}
