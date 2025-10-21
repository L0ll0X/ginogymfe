import {  NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UtenteDetail } from './utente-detail/utente-detail';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { UtentiComponent } from './utenti';
import { UserResolver } from './services/resolver-utente';

@NgModule({
  declarations: [
    UtentiComponent,
    UtenteDetail
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: UtentiComponent,
        children: [
          {
            path: 'utente-detail',
            component: UtenteDetail,
            resolve: {user: UserResolver}
          }
        ]
      },
    ]),
    HttpClientModule,
  ],
  providers: [

  ],
})
export class UtentiModule { }
