import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FeaturesRoutingModule } from './features-routing-module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { GruppiMuscolari } from './gruppi-muscolari/gruppi-muscolari';


@NgModule({
  declarations: [
    GruppiMuscolari
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
