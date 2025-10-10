
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Macchinari } from './macchinari';
import { MacchinarioDetails } from './macchinario-details/macchinario-details';


@NgModule({
  declarations: [
    Macchinari,
    MacchinarioDetails
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: Macchinari,
      },
      {
        path: 'macchinario-details',
        component: MacchinarioDetails,

      }
    ]),
    HttpClientModule,
    NgbModule,
    FormsModule

  ],
  providers: [

  ]
})
export class MacchinarioModule { }
