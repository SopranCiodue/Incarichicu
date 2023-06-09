import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitlePageComponent } from './title-page.component';

const routes: Routes = [
  {path: "", component: TitlePageComponent, }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TitlePageRoutingModule { }
