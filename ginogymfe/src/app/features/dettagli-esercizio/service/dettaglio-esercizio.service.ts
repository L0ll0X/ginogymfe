import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DettaglioEsercizio } from "../models/dettaglio-esercizio.model";
import { HttpClient } from "@angular/common/http";
import { url } from "../../../../environments/environment.dev";

@Injectable({
  providedIn: 'root'
})

export class DettaglioEsercizioService {
    constructor(private http: HttpClient) {}

    getDettaglioEsercizioById$(id: number): Observable<DettaglioEsercizio> {
      return this.http.get<DettaglioEsercizio>(`${url.baseUrl}${url.esercizi.base}`);
    }

    get$(): Observable<DettaglioEsercizio[]> {
        return this.http.get<DettaglioEsercizio[]>(`${url.baseUrl}${url.esercizi.base}`);
    }

    create$(dettaglioEsercizio: DettaglioEsercizio): Observable<DettaglioEsercizio> {
        console.log(`${url.baseUrl}${url.esercizi.base}`)
        return this.http.post<DettaglioEsercizio>(`${url.baseUrl}${url.esercizi.base}`, dettaglioEsercizio);
    }

    put$(dettaglioEsercizio: DettaglioEsercizio): Observable<DettaglioEsercizio> {
        return this.http.put<DettaglioEsercizio>(`${url.baseUrl}${url.esercizi.base}/${dettaglioEsercizio.id}`, dettaglioEsercizio);
    }

    delete$(id: number) {
      return this.http.delete(`${url.baseUrl}${url.esercizi.base}`);
    }

}
