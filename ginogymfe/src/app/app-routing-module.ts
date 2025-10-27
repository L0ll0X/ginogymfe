import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { UtenteDetail } from './features/utenti/utente-detail/utente-detail';
import { Home } from './features/home/home';
import { Utente } from './features/utenti/models/utenti.model';

const routes: Routes = [
  {
    path:'login',
    component: Login
  },
  {
    path: 'register',
    component: UtenteDetail
  },
  {
    path: '',
    component: Home
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
