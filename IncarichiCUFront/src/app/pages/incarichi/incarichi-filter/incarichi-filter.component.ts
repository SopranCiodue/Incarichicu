import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IIncarichi } from 'src/app/models/IIncarichi';
import { IncarichiService } from 'src/app/services/incarichi.service';

@Component({
  selector: 'app-incarichi-filter',
  templateUrl: './incarichi-filter.component.html',
  styleUrls: ['./incarichi-filter.component.scss'],
})
export class IncarichiFilterComponent implements OnInit, OnDestroy {
  searchText = '';
  incarichi: string = '';
  filteredItems: IIncarichi[] = [];

  public showIdSamError: boolean = false;
  private subscription: Subscription = new Subscription();
  showSearchBar: boolean = false;
  private totaleIncarichi: number = 0;
  public idsamPresent: boolean = true;

  constructor(private incarichiService: IncarichiService) { }

  ngOnInit() {
    this.loadListIncarichi();
  }
  
  existsIncarichi(){
    return this.totaleIncarichi>0;
  }
  gestioneViewIncarichi(){
    if (this.idsamPresent && this.existsIncarichi()) {
      this.showIdSamError = false;
      this.showSearchBar = true;  // Mostra la barra di ricerca se idsam è presente e ci sono incarichi
    } else {
      this.showIdSamError = true;
      this.showSearchBar = false;  // Nascondi la barra di ricerca altrimenti
    }
  }
  loadListIncarichi(){
    this.subscription = this.incarichiService.getIdsamObservable().subscribe((idsam: number | null) => {
      if (idsam === null) {
        this.showIdSamError = true;
        this.showSearchBar = false;  // nasconde la barra di ricerca
        // console.log('showSearchBar:', this.showSearchBar);
      } else {
        this.showIdSamError = false;
        this.showSearchBar = true;  // mostra la barra di ricerca
        // console.log('showSearchBar:', this.showSearchBar);
        // Usare idsam per richiedere gli incarichi
        this.incarichiService.getIncarichi(idsam).subscribe(incarichi => {
          this.incarichi = incarichi;
          this.filteredItems = incarichi;
          this.totaleIncarichi = incarichi.length;  // aggiorna il numero totale di incarichi
          this.gestioneViewIncarichi();  // controlla se mostrare o nascondere la barra di ricerca
        });
      }
    }, (error: any) => {
      this.showIdSamError = true;
      this.showSearchBar = false;  // nasconde la barra di ricerca
    });
  }
  onSearchTextChanged(searchText: string) {
    this.incarichiService.updateSearch(searchText);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


