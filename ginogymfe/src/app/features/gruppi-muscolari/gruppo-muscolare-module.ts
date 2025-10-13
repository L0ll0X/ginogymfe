import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { GruppoMuscolareDetail } from './gruppo-muscolare-detail/gruppo-muscolare-detail';
import { GruppiMuscolari } from './gruppi-muscolari';


@NgModule({
  declarations: [
    GruppoMuscolareDetail,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: GruppiMuscolari,
        children:[
          {
            path: 'detail',
            component: GruppoMuscolareDetail
          }
        ]
      },
    ]),
    HttpClientModule,
  ],
  providers: [
  
  ],

})
export class GruppoMuscolareDetailModule { }
