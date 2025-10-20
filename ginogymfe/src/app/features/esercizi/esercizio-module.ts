import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EsercizioDetails } from './esercizio-detail/esercizio-detail';
import { Esercizi } from './esercizi';
import { RouterModule } from '@angular/router';
import { EsercizioResolver } from './service/resolver-esercizio';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DettagliEsercizio } from '../dettagli-esercizio/dettagli-esercizio';
import { DettaglioEsercizioResolver } from '../dettagli-esercizio/service/dettaglio-esercizio.resolver';



@NgModule({
  declarations: [
    Esercizi,
    EsercizioDetails,
    DettagliEsercizio
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
        path: 'dettagli-esercizio',
        component: DettagliEsercizio,
        resolve: { dettaglioEsercizio: DettaglioEsercizioResolver }
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
