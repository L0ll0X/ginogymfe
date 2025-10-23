import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { url } from '../../../environments/environment.dev';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = url.baseUrl + '/auth';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login$(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, { usernameOrEmail: email, password })
      .pipe(
        tap(res => localStorage.setItem(this.tokenKey, res.token)) // salvo token in localStorage
      );
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
  const payload: any = jwtDecode(token); // decodifica il token
  return payload.roles || [];
}

}
