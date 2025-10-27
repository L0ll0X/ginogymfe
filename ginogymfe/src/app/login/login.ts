import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { ModaleErrore } from '../modale-errore/modale-errore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username: string = '';
  password: string = '';

  // 🔑 NUOVO: Stato per controllare se mostrare la password (inizialmente nascosta)
  showPassword = false;

  showErrorModal = false;

  constructor(private authService: AuthService, private router: Router, public activeModal: NgbModal) {}

  onLogin() {
    if (!this.username || !this.password) {
      this.openErrorModal('Attenzione', 'Compila tutti i campi!');
      return;
    }

    this.authService.login$(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['../home']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.openErrorModal('Accesso negato', 'Credenziali non valide. Riprova.');
        } else {
          this.openErrorModal('Errore di connessione', 'Si è verificato un errore. Riprova più tardi.');
        }
      }
    });
  }

  openErrorModal(title: string, message: string) {
    const modalRef = this.activeModal.open(ModaleErrore, { centered: true });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
  }


//   onLogin() {
//   if (!this.username || !this.password) {
//     alert('Compila tutti i campi!');
//     return;
//   }

//   this.authService.login$(this.username, this.password).subscribe({
//     next: () => {
//       // il token è già salvato nel service
//       this.router.navigate(['../home']);
//     },
//     // error: () => {
//     //   alert('Credenziali non valide.');
//     // }
//   });
// }

// 🔑 NUOVO: Metodo per cambiare lo stato al click
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
