import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utente } from '../models/utenti.model';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  constructor(private http: HttpClient) {

  }

  getUserById$(id: number): Observable<Utente> {
  return this.http.get<Utente>(`http://localhost:8080/utente/`);
}


  get$(): Observable<Utente[]> {
    return this.http.get<Utente[]>('http://localhost:8080/utente');
  }

  create$(utente: Utente) {
    return this.http.post('http://localhost:8080/utente', utente );

  }

}


