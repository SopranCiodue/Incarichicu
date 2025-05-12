import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncarichiFilterComponent } from './incarichi-filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IncarichiFilterComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  exports:
  [
    IncarichiFilterComponent
  ]
})
export class IncarichiFilterModule { }
