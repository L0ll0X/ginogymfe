import { Component } from '@angular/core';
import { AuthService } from '../login/service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
 
  menuOpen: boolean = false;

  constructor (private authService: AuthService) {}

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
    return this.authService.getRoles().includes('PERSONAL_TRAINER');
  }

  isAbbonato(): boolean {
    return this.authService.getRoles().includes('ABONNATO');
  }


}
