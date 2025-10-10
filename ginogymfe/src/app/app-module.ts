import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Macchinario } from './features/macchinario/macchinario';
import { GruppoMuscolareDetail } from './features/gruppo-muscolare-detail/gruppo-muscolare-detail';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    App,
    Macchinario,
    GruppoMuscolareDetail
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbTypeaheadModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
