import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtenteService } from './services/utente.service';
import { Utente } from './models/utenti.model';

@Component({
  selector: 'app-utenti',
  standalone: false,
  templateUrl: './utenti.html',
  styleUrl: './utenti.css'
})
export class Utenti {

 utenti: Utente[] = [];

  constructor(private service: UtenteService) {}

  ngOnInit(): void {
   this.service.get$()
       .subscribe({
        next: (response) => {
          this.utenti = response;
        },
        error: (error) => {
          console.error('Errore nel caricamento degli utenti:', error);
        }
      });
  }
}