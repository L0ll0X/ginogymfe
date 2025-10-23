import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
  if (!this.email || !this.password) {
    alert('Compila tutti i campi!');
    return;
  }

  this.authService.login$(this.email, this.password).subscribe({
    next: () => {
      // il token è già salvato nel service
      this.router.navigate(['/home']);
    },
    error: () => {
      alert('Credenziali non valide.');
    }
  });
}

}
