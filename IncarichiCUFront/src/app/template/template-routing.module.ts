import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template.component';

const routes: Routes = [
{
    path: "", component: TemplateComponent,
  children:
  [
    {
      path: "incarichi",
      loadChildren: () => import("./../pages/incarichi/incarichi-view/incarichi-view.module").then(m => m.IncarichiViewModule)
    },

  ]


}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
