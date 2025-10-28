import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { EsercizioScheda } from "../models/esercizio-scheda-utente.model";
import { CreaEsercizioScheda } from "../models/crea-esercizio-scheda.model";
import { ModificaEsercizioScheda } from "../models/modifica-esercizio-scheda.model";
import { Page } from "../../../macchinario/services/macchinario.service";
import { url } from "../../../../../environments/environment.dev";

@Injectable({
  providedIn: 'root'
})

export class EsercizioSchedaService {

  eserciziScheda: any[] = [];
  eserciziSchedaSubject = new BehaviorSubject<any[]>(this.eserciziScheda);
  eserciziScheda$ = this.eserciziSchedaSubject.asObservable();

  constructor(private http: HttpClient) { }

  getEsercizioSchedaById$(id: number): Observable<EsercizioScheda> {
    return this.http.get<EsercizioScheda>(`${url.baseUrl}${url.DettagliEsercizio.base}/${id}`);
  }

  getBySchedaId$(
    { schedaId, page, size, sort }: { schedaId: number, page: number, size: number, sort: string }
  ): Observable<Page<EsercizioScheda>> {
    const apiUrlByScheda = `${url.baseUrl}${url.DettagliEsercizio.base}/byworkoutplan/${schedaId}`;
    console.log("URL Richiesta Scheda:", apiUrlByScheda);
    console.log("ID Scheda Ricevuto:", schedaId);
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    return this.http.get<Page<EsercizioScheda>>(apiUrlByScheda, { params }).pipe(

    );
  }

  get$(pageable: { page: number, size: number, sort: string } = { page: 0, size: 15, sort: '' }): Observable<Page<EsercizioScheda>> {
    let params = new HttpParams()
      .set('page', pageable.page.toString())
      .set('size', pageable.size.toString())
      .set('sort', pageable.sort);

    return this.http.get<any>(`${url.baseUrl}${url.schede.base}`, { params }).pipe(
      tap(data => {
        this.eserciziScheda = data.content;
        this.eserciziSchedaSubject.next(this.eserciziScheda); // aggiorna lo stream
      })
    );
  }
  setEserciziScheda(eserciziScheda: EsercizioScheda[]) {
    this.eserciziSchedaSubject.next(eserciziScheda);
  }

  create$(esercizioScheda: CreaEsercizioScheda): Observable<EsercizioScheda> {
    return this.http.post<EsercizioScheda>(`${url.baseUrl}${url.schede.base}`, esercizioScheda).pipe(
      tap(newEser => {
        this.eserciziScheda.push(newEser);
        this.eserciziSchedaSubject.next(this.eserciziScheda); // aggiorna lo stream
      })
    );
  }

  put$(esercizioScheda: ModificaEsercizioScheda): Observable<EsercizioScheda> {
    return this.http.put<EsercizioScheda>(`${url.baseUrl}${url.schede.base}/${esercizioScheda.id}`, esercizioScheda).pipe(
      tap(updated => {
        const index = this.eserciziScheda.findIndex(m => m.id === updated.id);
        if (index >= 0) {
          this.eserciziScheda[index] = updated;
          this.eserciziSchedaSubject.next(this.eserciziScheda);
        }
      })
    );
  }

  delete$(id: number): Observable<void> {
    return this.http.delete<void>(`${url.baseUrl}${url.schede.base}/${id}`).pipe(
      tap(() => {
        this.eserciziScheda = this.eserciziScheda.filter(m => m.id !== id);
        this.eserciziSchedaSubject.next(this.eserciziScheda);
      })
    );
  }

}