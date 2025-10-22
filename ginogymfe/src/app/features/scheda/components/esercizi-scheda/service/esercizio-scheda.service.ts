import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { EsercizioScheda } from "../models/esercizio-scheda.model";
import { CreaEsercizioScheda } from "../models/crea-esercizio-scheda.model";
import { ModificaEsercizioScheda } from "../models/modifica-esercizio-scheda.model";
import { url } from "../../../../../../environments/environment.dev";
import { Page } from "../../../../macchinario/services/macchinario.service";
@Injectable({
  providedIn: 'root'
})

export class EsercizioSchedaService {

    eserciziScheda:any[]=[];
    eserciziSchedaSubject = new BehaviorSubject<any[]>(this.eserciziScheda);
    eserciziScheda$=this.eserciziSchedaSubject.asObservable();

    constructor(private http: HttpClient) {}

    getEsercizioSchedaById$(id: number): Observable<EsercizioScheda> {
          return this.http.get<EsercizioScheda>(`${url.baseUrl}${url.schede.base}/${id}`);
        }
    
    get$(pageable: { page: number, size: number, sort: string } = { page: 0, size: 10, sort: 'name,asc' }): Observable<Page<EsercizioScheda>> {
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
    
        delete$(id: number) : Observable<void>  {
          return this.http.delete<void>(`${url.baseUrl}${url.schede.base}/${id}`).pipe(
          tap(() => {
            this.eserciziScheda = this.eserciziScheda.filter(m => m.id !== id);
            this.eserciziSchedaSubject.next(this.eserciziScheda);
          })
        );
        }

}