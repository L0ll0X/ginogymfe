import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // rotta principale per la dashboard o feature principale (opzionale)
  {
    path: '',
    redirectTo: 'utenti',
    pathMatch: 'full'
  },

  // se hai un modulo "feature" principale, puoi lasciarlo
  {
    path: 'feature',
    loadChildren: () => import('./features/feature-module').then(m => m.FeatureModule)
  },

  // 👇 qui carichi il modulo utenti (lazy loading)
  {
    path: 'utenti',
    loadChildren: () => import('./features/utenti/utenti-module').then(m => m.UtentiModule)
  },

  // fallback per route non trovate
  {
    path: '**',
    redirectTo: 'utenti'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
   exports: [RouterModule]
  })
export class AppRoutingModule {}
