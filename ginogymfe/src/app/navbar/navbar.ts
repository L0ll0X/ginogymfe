import { Component } from '@angular/core';
import { AuthService } from '../login/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
 
  menuOpen: boolean = false;

  constructor (private authService: AuthService, private router: Router) {}

   toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  isLoggedIn(): boolean {
    return !!this.authService.getToken(); // se c'è il token, sei loggato
  }

  isAdmin(): boolean {
  return this.authService.getRoles().includes('ADMIN');
  }

  isTrainer(): boolean {
    return this.authService.getRoles().includes('PT');
  }

  isAbbonato(): boolean {
    return this.authService.getRoles().includes('UTENTE');
  }

  // 🔑 Metodo che gestisce la disconnessione
  onLogout() {
    this.authService.logout$(); // Rimuove il token
    this.router.navigate(['/login']); // Reindirizza alla pagina di login
    this.menuOpen = false; // Chiude il menu se aperto
  }


}
