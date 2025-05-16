import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-incarichi-filter',
  templateUrl: './incarichi-filter.component.html',
  styleUrls: ['./incarichi-filter.component.scss'],
  imports: [FormsModule],
})
export class IncarichiFilterComponent implements OnInit, OnDestroy {
  //
  // private subscription: Subscription = new Subscription();
  //
  // constructor(private incarichiService: IncarichiService) {}
  //
  ngOnInit() {
    //   this.loadListIncarichi();
  }

  loadListIncarichi() {
    // this.subscription = this.incarichiService.getIdsamObservable().subscribe(
    //   (idsam: number | null) => {
    //     if (idsam === null) {
    //       this.showIdSamError = true;
    //       this.showSearchBar = false; // nasconde la barra di ricerca
    //       // console.log('showSearchBar:', this.showSearchBar);
    //     } else {
    //       this.showIdSamError = false;
    //       this.showSearchBar = true; // mostra la barra di ricerca
    //       // console.log('showSearchBar:', this.showSearchBar);
    //       // Usare idsam per richiedere gli incarichi
    //       this.incarichiService.getIncarichi().subscribe((incarichi) => {
    //         this.incarichi = incarichi;
    //         this.filteredItems = incarichi;
    //         this.totaleIncarichi = incarichi.length; // aggiorna il numero totale di incarichi
    //         this.gestioneViewIncarichi(); // controlla se mostrare o nascondere la barra di ricerca
    //       });
    //     }
    //   },
    //   (error: any) => {
    //     this.showIdSamError = true;
    //     this.showSearchBar = false; // nasconde la barra di ricerca
    //   },
    // );
  }

  // onSearchTextChanged(searchText: string) {
  //   this.incarichiService.updateSearch(searchText);
  // }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
