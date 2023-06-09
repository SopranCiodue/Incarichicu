import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncarichiViewComponent } from './incarichi-view.component';

const routes: Routes = 
[
  {
    path: "", component: IncarichiViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncarichiViewRoutingModule { }
