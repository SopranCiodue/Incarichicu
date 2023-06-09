import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitlePageRoutingModule } from './title-page-routing.module';
import { TitlePageComponent } from './title-page.component';


@NgModule({
  declarations: [
    TitlePageComponent
  ],
  imports: [
    CommonModule,
    TitlePageRoutingModule
  ],
  exports:
  [
  TitlePageComponent
  ]
})
export class TitlePageModule { }
