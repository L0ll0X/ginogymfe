import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Esercizio } from "../models/esercizio-model";
import { url } from "../../../../environments/environment.dev";
import { CreaEsercizio } from "../models/crea-esercizio.model";
import { ModificaEsercizio } from "../models/modifica-esercizio.model";

@Injectable({
  providedIn: 'root'
})
export class EsercizioService {

  constructor(private http: HttpClient) {}

    getEsercizioById$(id: number): Observable<Esercizio> {
      return this.http.get<Esercizio>(`${url.baseUrl}${url.esercizi.base}`);
    }

    get$(): Observable<Esercizio[]> {
        return this.http.get<Esercizio[]>(`${url.baseUrl}${url.esercizi.base}`);
    }

    create$(esercizio: CreaEsercizio): Observable<Esercizio> {
        console.log(`${url.baseUrl}${url.esercizi.base}`)
        return this.http.post<Esercizio>(`${url.baseUrl}${url.esercizi.base}`, esercizio);
    }

    put$(esercizio: ModificaEsercizio): Observable<Esercizio> {
        return this.http.put<Esercizio>(`${url.baseUrl}${url.esercizi.base}/${esercizio.id}`, esercizio);
    }

    delete$(id: number) {
      return this.http.delete(`${url.baseUrl}${url.esercizi.base}`);
    }

}
