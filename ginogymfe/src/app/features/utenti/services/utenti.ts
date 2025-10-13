import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utente } from '../models/utenti.model';

@Injectable({
  providedIn: 'root'
})
export class Utenti {

  constructor(private http: HttpClient){
   
  }
  get$(): Observable<Utente[]> {
        return this.http.get<Utente[]>('http://localhost:8080/utente');
    }
    
}
  

