import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FeaturesRoutingModule } from './features-routing-module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { GruppoMuscolareDetail } from './gruppo-muscolare-detail/gruppo-muscolare-detail';
import { UtenteDetail } from './utenti/utente-detail/utente-detail';
import { Utenti } from './utenti/utenti';


@NgModule({
  declarations: [
    GruppoMuscolareDetail,
    UtenteDetail,
    Utenti,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FeaturesRoutingModule,
    NgbModule,
    FormsModule
   
  ],
  providers: [
    
  ]
})
export class FeatureModule { }
