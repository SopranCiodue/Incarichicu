import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncarichiViewRoutingModule } from './incarichi-view-routing.module';
import { IncarichiViewComponent } from './incarichi-view.component';
import { IncarichiListModule } from '../incarichi-list/incarichi-list.module';
import { IncarichiFilterModule } from '../incarichi-filter/incarichi-filter.module';
import { TitlePageComponent } from 'src/app/components/title-page/title-page.component';
import { TitlePageModule } from 'src/app/components/title-page/title-page.module';


@NgModule({
  declarations: [
    IncarichiViewComponent
  ],
  imports: [
    CommonModule,
    IncarichiViewRoutingModule,
    IncarichiListModule,
    IncarichiFilterModule,
    TitlePageModule
  ]
})
export class IncarichiViewModule { }
