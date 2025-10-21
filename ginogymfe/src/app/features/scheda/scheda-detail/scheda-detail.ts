import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SchedaModel } from '../models/scheda.model';
import { SchedaService } from '../services/scheda.service';
import { Utente } from '../../utenti/models/utenti.model';
import { UtenteService } from '../../utenti/services/utente.service';

@Component({
  standalone: false,
  selector: 'app-scheda-detail',
  templateUrl: './scheda-detail.html',
  styleUrls: ['./scheda-detail.css']
})
export class SchedaDetail implements OnInit {
  scheda = new SchedaModel();
  utenti: Utente[] = []; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private schedaService: SchedaService,
    private utenteService: UtenteService 
  ) {}

  ngOnInit(): void {
    this.caricaUtenti();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.schedaService.getById(+id).subscribe({
        next: (data) => (this.scheda = data),
        error: (err) => console.error('Errore nel caricamento della scheda:', err)
      });
    }
  }

  caricaUtenti(): void {
    this.utenteService.get$().subscribe({
      next: (data) => (this.utenti = data),
      error: (err) => console.error('Errore nel caricamento utenti:', err)
    });
  }

  submit(): void {
    if (this.scheda.id) {
      this.schedaService.put$(this.scheda).subscribe({
        next: () => {
          alert('Scheda aggiornata con successo!');
          this.router.navigate(['/schede']);
        },
        error: (error) => {
          console.error('Modifica fallita', error);
          alert('Errore durante la modifica della scheda.');
        }
      });
    } else {
      this.schedaService.create$(this.scheda).subscribe({
        next: (response) => {
          alert('Scheda creata con successo!');
          this.router.navigate(['/schede']);
        },
        error: (error) => {
          console.error('Creazione fallita', error);
          alert('Errore durante la creazione della scheda.');
        }
      });
    }
  }

  goBack(): void {
    window.history.back();
  }
}
