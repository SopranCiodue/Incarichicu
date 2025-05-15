import { Component, OnInit } from '@angular/core';
import { IncarichiService } from 'src/app/services/incarichi.service';
import { delay } from 'rxjs/operators';
import {
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { NgIf } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { IncarichiFilterComponent } from '../incarichi-filter/incarichi-filter.component';
import { IncarichiListComponent } from '../incarichi-list/incarichi-list.component';
import { DxButtonModule } from 'devextreme-angular';

@Component({
  selector: 'app-incarichi-view',
  templateUrl: './incarichi-view.component.html',
  styleUrls: ['./incarichi-view.component.scss'],
  imports: [
    MatSidenavContainer,
    MatSidenavContent,
    NgIf,
    MatProgressSpinner,
    IncarichiFilterComponent,
    IncarichiListComponent,
    DxButtonModule,
  ],
})
export class IncarichiViewComponent implements OnInit {
  idsam: number | null = null;
  isLoading: boolean = true;

  constructor(private incarichiService: IncarichiService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.incarichiService
      .getIdsamObservable()
      .pipe(delay(2000))
      .subscribe(
        (idsam) => {
          this.idsam = idsam;
          this.isLoading = false;
        },
        (error) => {
          console.error(error);
          this.isLoading = false;
        },
      );
  }
}
