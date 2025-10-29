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

  get$(options: { page?: number; size?: number; sort?: string; role?: string } = {}): Observable<Page<Utente>> {
    let params = new HttpParams();

    if (options.page !== undefined) params = params.set('page', options.page.toString());
    if (options.size !== undefined) params = params.set('size', options.size.toString());
    if (options.sort) params = params.set('sort', options.sort);
    if (options.role && options.role !== 'Tutti') params = params.set('role', options.role); // 👈 aggiunto

    console.log('📡 Chiamata get utenti con params:', params.toString()); // debug

    return this.http.get<Page<Utente>>(this.baseUrl, { params });
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
