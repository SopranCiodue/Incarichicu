import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { TemplateComponent } from './template.component';
import { HeaderPageModule } from '../components/header-page/header-page.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    TemplateComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    HeaderPageModule,
    RouterModule,
  ]
})
export class TemplateModule { }
