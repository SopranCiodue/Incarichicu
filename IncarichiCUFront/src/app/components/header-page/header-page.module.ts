import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderPageRoutingModule } from './header-page-routing.module';
import { HeaderPageComponent } from './header-page.component';
import { RouterModule } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    HeaderPageComponent
  ],
  imports: [
    CommonModule,
    HeaderPageRoutingModule,
    RouterModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  exports:
  [
  HeaderPageComponent
  ]
})
export class HeaderPageModule { }
