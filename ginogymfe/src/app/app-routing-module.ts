import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { UtenteDetail } from './features/utenti/utente-detail/utente-detail';

const routes: Routes = [
  {
    path:'login',
    component: Login
  },
  {
    path: 'register', // 👈 aggiungi questa
    component: UtenteDetail
  },
  {
    path: '',
    loadChildren: () => import('./features/feature-module').then(m => m.FeatureModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
