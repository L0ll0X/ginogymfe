import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utente } from '../models/utenti.model';
import { url } from '../../../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

private readonly baseUrl = url.baseUrl + url.utenti.base;
  constructor(private http: HttpClient) {}

  getUserById$(id: number): Observable<Utente> {
    return this.http.get<Utente>(`${url.baseUrl + url.utenti.base}/${id}`);
  }

  get$(page: number, size: number): Observable<{ content: Utente[], totalPages: number }> {
  return this.http.get<{ content: Utente[], totalPages: number }>(
    `${url.baseUrl + url.utenti.base}?page=${page}&size=${size}`
  );
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
