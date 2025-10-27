import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeaturesRoutingModule } from './features-routing-module';
import { UtenteDetail } from './utenti/utente-detail/utente-detail';
import { ModaleErrore } from '../modale-errore/modale-errore';


@NgModule({
  declarations: [
  
    ModaleErrore
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FeaturesRoutingModule
  ]
})
export class FeatureModule { }
