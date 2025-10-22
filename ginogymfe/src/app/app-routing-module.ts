import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './features/home/home';

const routes: Routes = [
  {
    path:'home',
    component:Home
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
