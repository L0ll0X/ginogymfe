import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./gruppi-muscolari/gruppo-muscolare-module').then(m => m.GruppoMuscolareModule)
  },
  {
    path: 'esercizi',
    loadChildren: () => import('./esercizi/esercizio-module').then(m => m.EsercizioModule)
  },
   {
    path: 'schede',
    loadChildren: () => import('./scheda/scheda-module').then(m => m.SchedaModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
