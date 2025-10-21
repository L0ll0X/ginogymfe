import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtentiComponent } from './utenti/utenti';

const routes: Routes = [
  {
    path: 'macchinari',
    loadChildren: () =>
      import('./macchinario/macchinario-module').then(m => m.MacchinarioModule)
  },
  {
    path: 'gruppi-muscolari',
    loadChildren: () =>
      import('./gruppi-muscolari/gruppo-muscolare-module').then(
        m => m.GruppoMuscolareModule
      )
  },
  {
    path: 'esercizi',
    loadChildren: () =>
      import('./esercizi/esercizio-module').then(m => m.EsercizioModule)
  },

  // ✅ Rotta standalone diretta
  { path: 'utenti', component: UtentiComponent },

  // ✅ Eventuale aggiungi utente (quando pronto)
  // { path: 'utenti/aggiungi', component: AggiungiUtenteComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    UtentiComponent // ✅ Import invece di dichiarazione
  ],
  exports: [RouterModule]
})
export class FeaturesRoutingModule {}
