import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { GruppoMuscolare } from "../models/gruppo-muscolare";
import { url } from "../../../../environments/environment.dev";
import { Page } from "../../macchinario/services/macchinario.service";

@Injectable({providedIn: 'root'})

export class GruppoMuscolareService {

    gruppiMuscolari:any[]=[];
    gruppiMuscolariSubject = new BehaviorSubject<GruppoMuscolare[]>([]);
    get gruppiMuscolari$(){ return this.gruppiMuscolariSubject.asObservable()}

constructor(private http: HttpClient) {
}

getGruppiMuscolariById$(id:number): Observable <GruppoMuscolare> {
    return this.http.get<GruppoMuscolare>(`${url.baseUrl}${url.gruppi_muscolari.base}/${id}`);
}


get$(pageable: { page: number, size: number, sort: string } = { page: 0, size: 15, sort: 'name,asc' }): Observable<Page<GruppoMuscolare>> {
    let params = new HttpParams()
    .set('page', pageable.page.toString())
    .set('size', pageable.size.toString())
    .set('sort', pageable.sort);
    return this.http.get<any>(`${url.baseUrl}${url.gruppi_muscolari.base}`, { params }).pipe(
      tap(data => {
        this.gruppiMuscolari = data.content;
        this.gruppiMuscolariSubject.next(this.gruppiMuscolari); // aggiorna lo stream
      })
    );
}


create$(gruppoMuscolare: GruppoMuscolare): Observable <GruppoMuscolare> {
    console.log(`${url.baseUrl}${url.gruppi_muscolari.base}`)
    return this.http.post<GruppoMuscolare>(`${url.baseUrl}${url.gruppi_muscolari.base}`, gruppoMuscolare).pipe(
      tap(newGroup => {
        this.gruppiMuscolari.push(newGroup);
        this.gruppiMuscolariSubject.next(this.gruppiMuscolari); // aggiorna lo stream
        })
    );
}


update$(gruppoMuscolare: GruppoMuscolare): Observable<GruppoMuscolare> {
    return this.http.put<GruppoMuscolare>(`${url.baseUrl}${url.gruppi_muscolari.base}/${gruppoMuscolare.id}`, gruppoMuscolare).pipe(
      tap(updated => {
        const index = this.gruppiMuscolari.findIndex(m => m.id === updated.id);
        if (index >= 0) {
          this.gruppiMuscolari[index] = updated;
          this.gruppiMuscolariSubject.next(this.gruppiMuscolari);
        }
      })
    );
}

delete$(id: number): Observable<void> {
  return this.http.delete<void>(`${url.baseUrl}${url.gruppi_muscolari.base}/${id}`).pipe(
      tap(() => {
        this.gruppiMuscolari = this.gruppiMuscolari.filter(m => m.id !== id);
        this.gruppiMuscolariSubject.next(this.gruppiMuscolari);
      })
    );
}


}