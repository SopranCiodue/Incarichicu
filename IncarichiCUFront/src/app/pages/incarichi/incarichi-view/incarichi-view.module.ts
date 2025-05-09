import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncarichiViewRoutingModule } from './incarichi-view-routing.module';
import { IncarichiViewComponent } from './incarichi-view.component';
import { IncarichiListModule } from '../incarichi-list/incarichi-list.module';
import { IncarichiFilterModule } from '../incarichi-filter/incarichi-filter.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    IncarichiViewComponent
  ],
  imports: [
    CommonModule,
    IncarichiViewRoutingModule,
    IncarichiListModule,
    IncarichiFilterModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
  ]
})
export class IncarichiViewModule { }
