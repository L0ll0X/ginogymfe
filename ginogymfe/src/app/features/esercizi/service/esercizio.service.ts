import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Esercizio } from "../models/esercizio-model";
import { url } from "../../../../environments/environment.dev";
import { CreaEsercizio } from "../models/crea-esercizio.model";
import { ModificaEsercizio } from "../models/modifica-esercizio.model";
import { Page } from "../../macchinario/services/macchinario.service";

@Injectable({
  providedIn: 'root'
})
export class EsercizioService {

  esercizi:any[]=[];
  eserciziSubject = new BehaviorSubject<any[]>(this.esercizi);
  esercizi$=this.eserciziSubject.asObservable();

  constructor(private http: HttpClient) {}

    getEsercizioById$(id: number): Observable<Esercizio> {
      return this.http.get<Esercizio>(`${url.baseUrl}${url.esercizi.base}/${id}`);
    }

    get$(pageable: { page: number, size: number, sort: string } = { page: 0, size: 10, sort: 'name,asc' }): Observable<Page<Esercizio>> {
    let params = new HttpParams()
    .set('page', pageable.page.toString())
    .set('size', pageable.size.toString())
    .set('sort', pageable.sort);
   
    return this.http.get<any>(`${url.baseUrl}${url.esercizi.base}`, { params }).pipe(
      tap(data => {
        this.esercizi = data.content;
        this.eserciziSubject.next(this.esercizi); // aggiorna lo stream
      })
    );
    }

  setEsercizi(esercizi: Esercizio[]) {
    this.eserciziSubject.next(esercizi);
  }

    create$(esercizio: CreaEsercizio): Observable<Esercizio> {
        console.log(`${url.baseUrl}${url.esercizi.base}`)
        return this.http.post<Esercizio>(`${url.baseUrl}${url.esercizi.base}`, esercizio).pipe(
      tap(newEser => {
        this.esercizi.push(newEser);
        this.eserciziSubject.next(this.esercizi); // aggiorna lo stream
        })
    );
    }

    put$(esercizio: ModificaEsercizio): Observable<Esercizio> {
        return this.http.put<Esercizio>(`${url.baseUrl}${url.esercizi.base}/${esercizio.id}`, esercizio).pipe(
       tap(updated => {
        const index = this.esercizi.findIndex(m => m.id === updated.id);
        if (index >= 0) {
          this.esercizi[index] = updated;
          this.eserciziSubject.next(this.esercizi);
        }
      })
    );
    }

    delete$(id: number) : Observable<void>  {
      return this.http.delete<void>(`${url.baseUrl}${url.esercizi.base}`).pipe(
      tap(() => {
        this.esercizi = this.esercizi.filter(m => m.id !== id);
        this.eserciziSubject.next(this.esercizi);
      })
    );
    }

}
