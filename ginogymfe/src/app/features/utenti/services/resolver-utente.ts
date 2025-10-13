import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Utente } from '../models/utenti.model';
import { UtenteService } from './utente.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<Utente> {

  constructor(private utenteService: UtenteService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Utente> {
    const userId = route.paramMap.get('id');
    
    if (!userId) {
      return of(new Utente()); // Oppure null / throw error, dipende dalla tua logica
    }

    return this.utenteService.getUserById$(+userId);
  }
}
