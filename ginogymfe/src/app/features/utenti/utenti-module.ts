import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Componenti classici (non standalone)
import { UtentiComponent } from './utenti';
import { AggiungiUtenteComponent } from './aggiungi-utente/aggiungi-utente.component';

// Servizi
import { UserResolver } from './services/resolver-utente';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: '', component: UtentiComponent },
      { path: 'aggiungi', component: AggiungiUtenteComponent },
      { path: 'aggiungi/:id', component: AggiungiUtenteComponent },
      {
        path: 'utente-detail/:id',
        // ✅ Caricamento del componente standalone
        loadComponent: () =>
          import('./utente-detail/utente-detail').then(
            (m) => m.UtenteDetailComponent
          ),
        resolve: { user: UserResolver }
      }
    ])
  ],
  providers: [UserResolver]
})
export class UtentiModule {}
