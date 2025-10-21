import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utente } from '../models/utenti.model';
import { url } from '../../../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {


  constructor(private http: HttpClient) {}

  getUserById$(id: number): Observable<Utente> {
    return this.http.get<Utente>(`${url.baseUrl + url.utenti.base}/${id}`);
  }

  get$(): Observable<Utente[]> { //aggiungere paginazione
    return this.http.get<Utente[]>(url.baseUrl + url.utenti.base);
  }

  create$(utente: Utente) {
    return this.http.post(url.baseUrl + url.utenti.base, utente );

  }

}
