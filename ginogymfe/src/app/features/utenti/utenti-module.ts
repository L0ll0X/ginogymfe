import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UtentiComponent } from './utenti';
import { UtenteDetail } from './utente-detail/utente-detail';
import { UserResolver } from './services/resolver-utente';

@NgModule({
  declarations: [
    UtenteDetail,
    UtentiComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forChild([
      // lista utenti
      { path: '', component: UtentiComponent },

      // creazione nuovo utente
      { path: 'detail', component: UtenteDetail, resolve: { user: UserResolver } },

      // modifica utente esistente
      { path: 'detail/:id', component: UtenteDetail, resolve: { user: UserResolver } },
    ])
  ],
  providers: [UserResolver]
})
export class UtentiModule {}