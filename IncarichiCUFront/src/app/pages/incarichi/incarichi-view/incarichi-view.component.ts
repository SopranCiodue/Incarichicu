import { Component, OnInit } from '@angular/core';
import { IncarichiListOldComponent } from '../components/incarichi-list-old/incarichi-list-old.component';
import { DxButtonModule } from 'devextreme-angular';
import { IncarichiListComponent } from '../components/incarichi-list/incarichi-list.component';

@Component({
  selector: 'app-incarichi-view',
  templateUrl: './incarichi-view.component.html',
  styleUrls: ['./incarichi-view.component.scss'],
  imports: [IncarichiListOldComponent, DxButtonModule, IncarichiListComponent],
})
export class IncarichiViewComponent implements OnInit {
  // idsam: number | null = null;
  // isLoading: boolean = true;
  //
  // constructor(private incarichiService: IncarichiService) {}

  ngOnInit(): void {
    // this.isLoading = true;
    // this.incarichiService
    //   .getIdsamObservable()
    //   .pipe(delay(2000))
    //   .subscribe(
    //     (idsam) => {
    //       this.idsam = idsam;
    //       this.isLoading = false;
    //     },
    //     (error) => {
    //       console.error(error);
    //       this.isLoading = false;
    //     },
    //   );
  }
}
