import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EvaluacionesComponent} from "./profesor/pages/evaluaciones/evaluaciones.component";

const routes: Routes = [
  { path: 'evaluaciones', component: EvaluacionesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
