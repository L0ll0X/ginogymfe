import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GruppoMuscolareDetail } from './gruppo-muscolare-detail/gruppo-muscolare-detail';

const routes: Routes = [
  {
    path: 'macchinari',
    loadChildren: () => import('./macchinario/macchinario-module').then(m => m.MacchinarioModule)
  },
  {
    path:'gruppo-muscolare-detail',
    loadChildren: () => import('./gruppo-muscolare-detail/gruppo-muscolare-module').then(m => m.GruppoMuscolareDetailModule)
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
