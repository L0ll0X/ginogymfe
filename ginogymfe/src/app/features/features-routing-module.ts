import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GruppoMuscolareDetail } from './gruppi-muscolari/gruppo-muscolare-detail/gruppo-muscolare-detail';
import { UtenteDetail } from './utenti/utente-detail/utente-detail';

const routes: Routes = [
  {
    path: 'macchinari',
    loadChildren: () => import('./macchinario/macchinario-module').then(m => m.MacchinarioModule)
  },
   {
    path: 'utenti',
    loadChildren: () => import('./utenti/utenti-module').then(m => m.UtentiModule)
  },
  {
    path:'gruppi-muscolari',
    loadChildren: () => import('./gruppi-muscolari/gruppo-muscolare-module').then(m => m.GruppoMuscolareDetailModule)
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
