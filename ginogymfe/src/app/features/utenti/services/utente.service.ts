import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utente } from '../models/utenti.model';
import { url } from '../../../../environments/environment.dev';
import { Page } from '../../macchinario/services/macchinario.service';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

private readonly baseUrl = url.baseUrl + url.utenti.base;
  constructor(private http: HttpClient) {}

  getUserById$(id: number): Observable<Utente> {
    return this.http.get<Utente>(`${url.baseUrl + url.utenti.base}/${id}`);
  }



  get$(pageable: { page: number, size: number, sort: string } = { page: 0, size: 10, sort: 'name,asc' }): Observable<Page<Utente>> {
    let params = new HttpParams()
      .set('page', pageable.page.toString())
      .set('size', pageable.size.toString())
      .set('sort', pageable.sort);
      return this.http.get<any>(`${url.baseUrl}${url.utenti.base}`, { params })
      //.pipe(
    //   tap(data => {
    //     this.macchinari = data.content;
    //     this.macchinariSubject.next(this.macchinari); // aggiorna lo stream
    //   })
    // );
  }


  create$(utente: Utente) {
    return this.http.post(url.baseUrl + url.utenti.base, utente );

  }
  delete$(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}`);

  }

  update$(userId: number, payload: any){
    return this.http.put<Utente>(`${url.baseUrl + url.utenti.base}/${userId}`, payload);

  }
}
