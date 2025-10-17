import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtenteService } from './services/utente.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-utenti',
  standalone:false,
  templateUrl: './utenti.html',
})
export class UtentiComponent implements OnInit {
  utenti: any[] = [];
  utentiFiltrati: any[] = [];
  mostraSoloAbbonati = false;

  constructor(private service: UtenteService) {}

  ngOnInit() {
    this.service.get$().pipe(
      tap(x => this.utenti= x)
    ).subscribe()
  }

  filtraUtenti() {
    if (this.mostraSoloAbbonati) {
      this.utentiFiltrati = this.utenti.filter(u => u.abbonato === true);
    } else {
      this.utentiFiltrati = this.utenti;
    }
  }

  resetFiltro() {
    this.mostraSoloAbbonati = false;
    this.utentiFiltrati = this.utenti;
  }
}
