import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SchedaResolver } from './services/scheda.resolver';
import {  Schede } from './schede';
import { SchedaDetail } from './scheda-detail/scheda-detail';
import { SchedaEserciziDetail } from './components/scheda-esercizi-detail/scheda-esercizi-detail';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { EserciziScheda as ListaEserciziSchedaUtente } from './lista-esercizi-scheda-utente/esercizi-scheda';



@NgModule({
    declarations: [Schede, SchedaDetail, ListaEserciziSchedaUtente, SchedaEserciziDetail],
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
                path: 'esercizi-scheda/:id',
                component: ListaEserciziSchedaUtente
            }
        ])
    ]    
})


export class SchedaModule {

    constructor(){ console.log("modulo scheda creato")}
 } 
