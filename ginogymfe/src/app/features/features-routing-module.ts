import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GruppoMuscolareDetail } from './gruppo-muscolare-detail/gruppo-muscolare-detail';
import { UtenteDetail } from './utenti/utente-detail/utente-detail';

const routes: Routes = [
  {
    path: 'macchinari',
    loadChildren: () => import('./macchinario/macchinario-module').then(m => m.MacchinarioModule)
  },
<<<<<<< HEAD
  {
    path:'gruppo-muscolare-detail',
    component: GruppoMuscolareDetail
  },
   {
    path: 'utenti',
    loadChildren: () => import('./utenti/utenti-module').then(m => m.UtentiModule)
  },

=======
>>>>>>> develop_giulia
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
