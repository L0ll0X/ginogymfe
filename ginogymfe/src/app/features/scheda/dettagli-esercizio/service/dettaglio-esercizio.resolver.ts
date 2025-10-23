import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot } from "@angular/router";

import { DettaglioEsercizioService } from "./dettaglio-esercizio.service";
import { Observable, of } from "rxjs";
import { DettaglioEsercizio } from "../models/dettaglio-esercizio.model";


@Injectable({
  providedIn: 'root'
})

export class DettaglioEsercizioResolver implements Resolve<DettaglioEsercizio> {

    constructor(private dettaglioEsercizioService: DettaglioEsercizioService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DettaglioEsercizio> {
      const dettaglioEsercizioId = route.paramMap.get('id');
      
      if (!dettaglioEsercizioId) {
        return of(new DettaglioEsercizio()); // Oppure null / throw error, dipende dalla tua logica
      }
  
      return this.dettaglioEsercizioService.getDettaglioEsercizioById$(+dettaglioEsercizioId);
    }
}