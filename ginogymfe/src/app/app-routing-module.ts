import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtenteDetail } from './features/utenti/utente-detail/utente-detail';

const routes: Routes = [
  {
    path: '',
    component: UtenteDetail
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
