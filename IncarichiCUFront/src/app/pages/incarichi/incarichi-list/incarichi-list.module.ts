import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IncarichiListRoutingModule } from './incarichi-list-routing.module';
import { IncarichiListComponent } from './incarichi-list.component';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { IncarichiFilterModule } from '../incarichi-filter/incarichi-filter.module';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IncarichiAllegatiModule } from '../incarichi-allegati/incarichi-allegati.module';


@NgModule({
  declarations: [
    IncarichiListComponent
  ],
  imports: [
    CommonModule,
    IncarichiListRoutingModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    RouterModule,
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
    IncarichiFilterModule,
    MatIconModule,
    IncarichiAllegatiModule

  ],
  exports:
  [
    IncarichiListComponent
  ]
})
export class IncarichiListModule { }
