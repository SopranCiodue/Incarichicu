import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncarichiListComponent } from './incarichi-list.component';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IncarichiFilterModule } from '../incarichi-filter/incarichi-filter.module';
import { MatIconModule } from '@angular/material/icon';
import { IncarichiAllegatiModule } from '../incarichi-allegati/incarichi-allegati.module';

@NgModule({
  declarations: [
    IncarichiListComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    IncarichiFilterModule,
    IncarichiAllegatiModule
  ],
  exports:
  [
    IncarichiListComponent
  ]
})
export class IncarichiListModule { }
