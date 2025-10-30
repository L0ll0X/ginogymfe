import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Utente } from '../models/utenti.model';
import { url } from '../../../../environments/environment.dev';
import { Page } from '../../macchinario/services/macchinario.service';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

private readonly baseUrl = url.baseUrl + url.utenti.base;

utenti: any[] = [];
utentiSubject = new BehaviorSubject<Utente[]>([]);
get utenti$() { return this.utentiSubject.asObservable() }
  
constructor(private http: HttpClient) {}

  getUserById$(id: number): Observable<Utente> {
    return this.http.get<Utente>(`${url.baseUrl + url.utenti.base}/${id}`);
  }

  get$(pageable: { page: number, size: number, sort: string, role?: string } = { page: 0, size: 10, sort: 'name,asc' }): Observable<Page<Utente>> {
  let params = new HttpParams()
    .set('page', pageable.page.toString())
    .set('size', pageable.size.toString())
    .set('sort', pageable.sort);

  // 🔹 aggiungiamo eventualmente il filtro ruolo
  if (pageable.role && pageable.role !== 'Tutti') {
    params = params.set('role', pageable.role);
  }

  return this.http.get<Page<Utente>>(`${this.baseUrl}`, { params }).pipe(
    // 🔹 aggiorna il BehaviorSubject con i dati della pagina
    tap(pageData => {
      this.utenti = pageData.content;
      this.utentiSubject.next(this.utenti);
    })
  );
}



  create$(utente: Utente) {
    return this.http.post(url.baseUrl + 'auth/register', utente );

  }
  delete$(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}`);

  }

  update$(userId: number, payload: any){
    return this.http.put<Utente>(`${url.baseUrl + url.utenti.base}/${userId}`, payload);

  }
}
