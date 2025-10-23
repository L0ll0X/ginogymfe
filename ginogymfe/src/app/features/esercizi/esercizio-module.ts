import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EsercizioDetails } from './esercizio-detail/esercizio-detail';
import { Esercizi } from './esercizi';
import { RouterModule } from '@angular/router';
import { EsercizioResolver } from './service/resolver-esercizio';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    Esercizi,
    EsercizioDetails,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: Esercizi,
        // children:[
        // ]
      },
      {
        path: 'details',
        component: EsercizioDetails,
        resolve: { esercizio: EsercizioResolver }
      },
      {
        path: 'details/:id', 
        component: EsercizioDetails,
        resolve: { esercizio: EsercizioResolver }
      }
      
    ]),
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [

  ]
})

export class EsercizioModule { }
