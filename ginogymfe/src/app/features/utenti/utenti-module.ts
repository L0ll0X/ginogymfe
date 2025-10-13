import { Component, NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UtenteDetail } from './utente-detail/utente-detail';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { Utenti } from './utenti';


@NgModule({
  declarations: [
    Utenti,
    UtenteDetail
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: Utenti,
        children: [
          {
            path: 'utente-detail',
            component: UtenteDetail
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
