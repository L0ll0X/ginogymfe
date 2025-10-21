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

  // 🔹 GET ALL (paginato)
  get$(page: number = 0, size: number = 10): Observable<{ content: Utente[]; totalElements: number; totalPages: number }> {
    return this.http.get<{ content: Utente[]; totalElements: number; totalPages: number }>(
      `${url.baseUrl + url.utenti.base}?page=${page}&size=${size}`
    );
  }

  // 🔹 GET BY ID
  getUserById$(id: number): Observable<Utente> {
    return this.http.get<Utente>(`${url.baseUrl + url.utenti.base}/${id}`);
  }

  // 🔹 CREATE
  create$(utente: Utente): Observable<Utente> {
    return this.http.post<Utente>(`${url.baseUrl + url.utenti.base}`, utente);
  }

  // 🔹 UPDATE
  update$(id: number, utente: Utente): Observable<Utente> {
    return this.http.put<Utente>(`${url.baseUrl + url.utenti.base}/${id}`, utente);
  }

  // 🔹 DELETE
  delete$(id: number): Observable<void> {
    return this.http.delete<void>(`${url.baseUrl + url.utenti.base}/${id}`);
  }
}
