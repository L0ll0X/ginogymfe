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
    RouterModule.forChild([
      {
        path: '',
        component: UtentiComponent,
      },
      {
      path: 'details',
      component: UtenteDetail,
      resolve: {user: UserResolver}
    }
        
      
    ]),
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      //creazione
      { path: 'detail', component: UtenteDetail, resolve: { user: UserResolver } },
    //modifica
      { path: 'detail/:id', component: UtenteDetail, resolve: { user: UserResolver } },
    ])
  ],
  providers: [UserResolver]
})
export class UtentiModule {}
