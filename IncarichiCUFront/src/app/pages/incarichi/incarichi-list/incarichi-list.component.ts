import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IncarichiService } from 'src/app/services/incarichi.service';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { startWith, debounceTime, switchMap, map } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IIncarichi } from 'src/app/models/IIncarichi';
import { MatTableDataSource } from '@angular/material/table';
import { IAllegatiList } from 'src/app/models/IAllegatiList';
import { forkJoin } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-incarichi-list',
  templateUrl: './incarichi-list.component.html',
  styleUrls: ['./incarichi-list.component.scss'],
})
export class IncarichiListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'key_ord',
    'servizio',
    'eseguito',
    'dataFattTecnico',
    'annullato',
    'codiceMago',
    'ragSociale',
    'prov',
    'cap',
    'comune',
    'indirizzo',
    'allegato',
  ];
  displayedColumnsAllegati: string[] = [
    'Keyord',
    'contatore',
    'desc',
    'DataAllegato',
    'Data_Rientro',
  ];

  public listAllegati: IAllegatiList[] = [];
  public list: IIncarichi[] = [];
  public selectedAllegati: IAllegatiList[] = [];
  public dataSource: MatTableDataSource<IIncarichi> =
    new MatTableDataSource<IIncarichi>([]);
  public backupSelected?: IIncarichi;
  public expandedElement!: IIncarichi | null;
  isExpansionDetailRow = (index: number, row: any) =>
    row.hasOwnProperty('detailRow');
  public incarichiSubcription: Subscription = new Subscription(); // Inizializza la Subscription
  public isLoading: Boolean = true;
  public showIdSamError: boolean = false;
  public idsamPresent: boolean = true;
  private totaleIncarichi: number = 0;
  


  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  changeDetectorRefs: any;

  constructor(
    private router: Router,
    private incarichiService: IncarichiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  ngAfterViewInit(): void {
    this.paginatorPage();
  }

  ngOnInit(): void {
    this.gestioneExistsIdSam();
    this.getAllList();
    this.aggiornamentoFiltro();
    this.isLoading = false; 
  }
  
  setupFilterAndSubscription(incarichiService: IncarichiService, dataSource: MatTableDataSource<IIncarichi>) {
    dataSource.filterPredicate = (data: IIncarichi, filter: string) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    };
    return incarichiService.getSearchObservable().subscribe((searchText: string) => {
      searchText = searchText.trim().toLowerCase();
      dataSource.filter = searchText;
    });
  }
  
  getAllList() {
    const idsam = this.incarichiService.getIdsam(); // Ottieni l'idsam dall'URL
    if (!idsam) {
      // Gestisci il caso in cui idsam non sia disponibile
      this.idsamPresent = false;
      console.error('idsam non disponibile');
      return;
    }
    this.isLoading = true;
    this.incarichiService
      .getIncarichi(idsam)
      .subscribe((incarichi: IIncarichi[]) => {
        this.list = [];
        this.totaleIncarichi = incarichi.length;
        this.gestioneViewIncarichi();
        incarichi.forEach((incarico, index) => {
          this.incarichiService
            .getAllegati(incarico.key_ord, incarico.haccp)
            .subscribe((allegati) => {
              const incaricoWithAllegati = {
                ...incarico,
                allegati,
                dataFattTecnicoFormatted: incarico.dataFattTecnico
                  ? formatDate(incarico.dataFattTecnico, 'dd/MM/yyyy', 'en-US')
                  : '',
                hasAttachments: allegati && allegati.length > 0,
              };
              this.list.push(incaricoWithAllegati);
              if (this.list.length === incarichi.length) {
                this.dataSource.data = this.list; 
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.isLoading = false;
                this.incarichiSubcription.add(
                  this.setupFilterAndSubscription(this.incarichiService, this.dataSource)
                );
                this.changeDetectorRefs.detectChanges();
              }
            });
        });
      });
  }
  
  
  onRowClicked(incarichi: IIncarichi) {}
  toggleExpandedElement(row: IIncarichi) {
    this.listAllegati = [];
    this.incarichiService.setSelectedIncarichiData(row.key_ord, row.haccp);
    this.incarichiSubcription.add(
      // Aggiungi la nuova sottoscrizione all'elenco delle sottoscrizioni
      this.incarichiService
        .getAllegati(row.key_ord, row.haccp)
        .subscribe((resp) => {
          this.listAllegati = resp;
          this.expandedElement = this.expandedElement === row ? null : row;
        })
    );
  }
  hasAttachments(row: IIncarichi): boolean {
    // Utilizzo la nuova proprietà 'hasAttachments' per capire se la riga ha allegati o meno
    return row.hasAttachments ?? false;
  }
existsIncarichi(){
  return this.totaleIncarichi>0;
}
gestioneViewIncarichi(){
  this.showIdSamError = true;
  if(this.idsamPresent){
    if(this.existsIncarichi()){
      this.showIdSamError = false;
    } 
  }
}
ngOnDestroy(): void {
  this.incarichiSubcription.unsubscribe(); // Annulla tutte le sottoscrizioni quando il componente viene distrutto
}
gestioneExistsIdSam(){
  let idsam: number | null;
  try {
    idsam = this.incarichiService.getIdsam();
  } catch (error) {
    this.showIdSamError = true;
    this.isLoading = false; 
    return;
  }

  if (!idsam || idsam < 0) {
    this.showIdSamError = true;
    this.isLoading = false; 
    return;
  }
}
aggiornamentoFiltro(){
    this.incarichiSubcription.add(
    this.setupFilterAndSubscription(this.incarichiService, this.dataSource)
    );
}
paginatorPage(){
  if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort) this.dataSource.sort = this.sort;
}
}
