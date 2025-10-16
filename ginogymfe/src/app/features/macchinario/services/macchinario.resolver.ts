import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Macchinario } from "../models/macchinario.model";
import { Observable, of } from "rxjs";
import { Utente } from "../../utenti/models/utenti.model";
import { UtenteService } from "../../utenti/services/utente.service";
import { MacchinarioService } from "./macchinario.service";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn:'root'
})
export class MacchinarioResolver implements Resolve<Macchinario> {
    constructor(private macchinarioService: MacchinarioService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Macchinario> {
        const macchinarioId = route.paramMap.get('id');

        if (!macchinarioId) {
            return of(new Macchinario()); 
        }

        return this.macchinarioService.getMacchinarioById$(Number.parseInt(macchinarioId));
    }
}