import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SchedaResolver } from './services/scheda.resolver';
import {  Schede } from './schede';
import { SchedaDetail } from './scheda-detail/scheda-detail';
import { EserciziScheda } from './components/esercizi-scheda/esercizi-scheda';
import { SchedaEserciziDetail } from './components/scheda-esercizi-detail/scheda-esercizi-detail';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { DettagliEsercizio } from './dettagli-esercizio/dettagli-esercizio';
import { EsercizioSchedaResolver } from './components/esercizi-scheda/service/esercizio-scheda.resolver';


@NgModule({
    declarations: [Schede, SchedaDetail, EserciziScheda, SchedaEserciziDetail, DettagliEsercizio],
    imports: [
        NgbCollapseModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forChild([
            {
                path: '',
                component: Schede
            },
            {
                path: 'detail',
                component: SchedaDetail,
                resolve: { scheda: SchedaResolver }
            },
            {
                path: 'detail/:id',
                component: SchedaDetail,
                resolve: { scheda: SchedaResolver }
            },
            {
                path: 'esercizi-scheda',
                component: EserciziScheda,
                resolve: { scheda: EsercizioSchedaResolver }
            }
            // {
            //     path: 'dettagli-esercizio',
            //     component: DettagliEsercizio,
            //     resolve: { dettaglioEsercizio: DettaglioEsercizioResolver }
            // },
            // {
            //     path: 'scheda-esercizi-details',
            //     component: SchedaEserciziDetail,
            //     resolve: { scheda: EsercizioSchedaResolver }
            // }
        ])
    ]    
})


export class SchedaModule {

    constructor(){ console.log("modulo scheda creato")}
 } 
