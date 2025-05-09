import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncarichiAllegatiComponent } from './incarichi-allegati.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    IncarichiAllegatiComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule
  ],
  exports:
  [
    IncarichiAllegatiComponent,

  ]
})
export class IncarichiAllegatiModule { }
