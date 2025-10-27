import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { url } from '../../../environments/environment.dev';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = url.baseUrl + 'auth';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login$(username: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/login`, { usernameOrEmail: username, password }, { responseType: 'text' as 'json' } )
      .pipe(
          tap((token: string) => { localStorage.setItem(this.tokenKey, token); })
    ) as Observable<string>;
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null; // evita errore in SSR
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return !!this.getToken();
  }

  logout$(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.tokenKey);
  }


  getRoles(): string[] {
  const token = this.getToken();
  if (!token) return [];
    try {
          // decodifica il token. Assicurati che il token sia valido
          const payload: any = jwtDecode(token); 
          // Si assume che il BE passi un array di ruoli sotto la chiave 'roles'
          return payload.roles || [];
        } catch (error) {
          console.error('Errore durante la decodifica del token:', error);
          return [];
        }
  }

  // 🔑 LOGICA AGGIUNTA: Controlla se l'array di ruoli include 'ADMIN'
  isAdmin(): boolean {
    // Si assume che il ruolo nel token sia in maiuscolo, e sia 'ADMIN'
    return this.getRoles().includes('ADMIN'); 
  }

  // 🔑 LOGICA AGGIUNTA: Controlla se l'array di ruoli include 'TRAINER'
  isTrainer(): boolean {
    // Si assume che il ruolo nel token sia in maiuscolo, e sia 'TRAINER'
    return this.getRoles().includes('TRAINER');
  }

}
