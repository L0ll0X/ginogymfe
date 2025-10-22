import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UtenteService } from './services/utente.service';
import { Utente } from './models/utenti.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Page } from '../macchinario/services/macchinario.service';

@Component({
  selector: 'app-utenti',
  standalone: false,
  templateUrl: './utenti.html',
  styleUrls: ['./utenti.css']
})
export class UtentiComponent implements OnInit {
  utenti$!: Observable<Utente[]>
  ruoloFiltro: string = 'Tutti';
  currentPage = 0;
  totalPages = 1;
  sort = 'id,asc';

  constructor(private utenteService: UtenteService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.utenti$ = this.utenteService.get$({ page: this.currentPage, size: 10, sort:this.sort }).pipe(
      map((page: Page<Utente>) => page.content)
    )

  }

 

  goToCreate(): void {
    this.router.navigate(['/utenti/detail']);
  }

  goToDetail(id: number): void {
    this.router.navigate(['/utenti/detail', id]);
  }

  // 🔹 Elimina utente
  delete(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questo utente?')) {
      this.utenteService.delete$(id).subscribe({
        next: () => {
          alert('Utente eliminato con successo!');
          this.load();
        },
        error: (err) => console.error('Errore durante l\'eliminazione:', err)
      });
    }
  }

  // 🔹 Paginazione
  paginaPrecedente(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.load();
    }
  }

  paginaSuccessiva(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.load();
    }
  }

  // 🔹 Torna alla Home
  tornaHome(): void {
    this.router.navigate(['../home']);
  }
}
