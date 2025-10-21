import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SchedaResolver } from './services/scheda.resolver';
import {  Schede } from './schede';
import { SchedaDetail } from './scheda-detail/scheda-detail';

@NgModule({
    declarations: [Schede, SchedaDetail],
    imports: [
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
            }
        ])
    ]
})
export class SchedaModule {

    constructor(){ console.log("modulo scheda creato")}
 } 
