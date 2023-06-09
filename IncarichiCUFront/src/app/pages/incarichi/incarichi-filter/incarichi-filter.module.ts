import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncarichiFilterRoutingModule } from './incarichi-filter-routing.module';
import { IncarichiFilterComponent } from './incarichi-filter.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IncarichiFilterComponent
  ],
  imports: [
    CommonModule,
    IncarichiFilterRoutingModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule,
    FormsModule
  ],
  exports:
  [
    IncarichiFilterComponent
  ]
})
export class IncarichiFilterModule { }
