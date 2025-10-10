import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GruppoMuscolareDetail } from './gruppo-muscolare-detail/gruppo-muscolare-detail';
import { UtenteDetail } from './utenti/utente-detail/utente-detail';

const routes: Routes = [
  {
    path: 'macchinari',
    loadChildren: () => import('./macchinario/macchinario-module').then(m => m.MacchinarioModule)
  },
  {
    path:'gruppo-muscolare-detail',
    component: GruppoMuscolareDetail
  },
  {
    path:'user-detail',
    component: UtenteDetail
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
