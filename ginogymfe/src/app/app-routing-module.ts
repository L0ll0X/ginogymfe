import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GruppoMuscolare } from './features/gruppo-muscolare-detail/models/gruppo-muscolare';
import { GruppoMuscolareDetail } from './features/gruppo-muscolare-detail/gruppo-muscolare-detail';

const routes: Routes = [
  {
    path:'',
    component: GruppoMuscolareDetail
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
