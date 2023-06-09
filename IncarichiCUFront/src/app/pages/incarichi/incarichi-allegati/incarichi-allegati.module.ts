import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncarichiAllegatiRoutingModule } from './incarichi-allegati-routing.module';
import { IncarichiAllegatiComponent } from './incarichi-allegati.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    IncarichiAllegatiComponent
  ],
  imports: [
    CommonModule,
    IncarichiAllegatiRoutingModule,
    MatTableModule,
    MatIconModule
  ],
  exports:
  [
    IncarichiAllegatiComponent,

  ]
})
export class IncarichiAllegatiModule { }
