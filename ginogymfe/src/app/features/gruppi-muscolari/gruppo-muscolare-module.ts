import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { GruppoMuscolareDetail } from "./gruppo-muscolare-detail/gruppo-muscolare-detail";
import { GruppoMuscolareResolver } from './service/resolver-gruppo-muscolare';
import { GruppiMuscolari } from './gruppi-muscolari';


@NgModule({
  declarations: [
    GruppiMuscolari,
    GruppoMuscolareDetail
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,

    RouterModule.forChild([
      {
        path: '',
        component: GruppiMuscolari
      },
      {
        path: 'details/:id',
        component: GruppoMuscolareDetail,
        resolve: { gruppoMuscolare: GruppoMuscolareResolver }
      },
      {
        path: 'details',
        component: GruppoMuscolareDetail,
        resolve: { gruppoMuscolare: GruppoMuscolareResolver }
      }
    ]),
  ],

  providers: [
    GruppoMuscolareResolver
  ]
})
export class GruppoMuscolareModule { }