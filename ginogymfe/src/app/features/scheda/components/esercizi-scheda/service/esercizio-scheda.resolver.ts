import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { EsercizioScheda } from "../models/esercizio-scheda.model";
import { EsercizioSchedaService } from "./esercizio-scheda.service";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EsercizioSchedaResolver implements Resolve<EsercizioScheda> {

  constructor(private esercizioSchedaService: EsercizioSchedaService) {}
  
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EsercizioScheda> {
      const esercizioId = route.paramMap.get('id');
      
      if (!esercizioId) {
        return of(new EsercizioScheda()); // Oppure null / throw error, dipende dalla tua logica
      }
  
      return this.esercizioSchedaService.getEsercizioSchedaById$(+esercizioId);
    }
  
}