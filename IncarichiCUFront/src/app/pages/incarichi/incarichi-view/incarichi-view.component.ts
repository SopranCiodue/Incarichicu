import { Component, OnInit } from '@angular/core';
import { IncarichiService } from 'src/app/services/incarichi.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-incarichi-view',
  templateUrl: './incarichi-view.component.html',
  styleUrls: ['./incarichi-view.component.scss']
})
export class IncarichiViewComponent implements OnInit {
  idsam: number | null = null;
  isLoading: boolean = true; 

  constructor(private incarichiService: IncarichiService) { }

  ngOnInit(): void {
    // Start loading
    this.isLoading = true;

    // Delay for demonstration purposes
    this.incarichiService.getIdsamObservable().pipe(
      delay(2000)  // delay of 2 seconds
    ).subscribe(
      idsam => {
        this.idsam = idsam;
        this.isLoading = false;
      },
      error => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }
}


