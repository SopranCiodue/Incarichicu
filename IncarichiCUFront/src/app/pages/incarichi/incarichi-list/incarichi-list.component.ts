import { Component, OnInit, ViewChild } from '@angular/core';
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
export class IncarichiListComponent implements OnInit {
  displayedColumns: string[] = [
    'codiceMago',
    'ragSociale',
    'prov',
    'cap',
    'comune',
    'indirizzo',
    'key_ord',
    'servizio',
    'eseguito',
    'annullato',
    'dataFattTecnico',
    'allegato',
    // 'haccp',
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

  @ViewChild(MatSort, { static: true }) sort: any;
  @ViewChild(MatPaginator, { static: true }) paginator: any;

  constructor(
    private router: Router,
    private incarichiService: IncarichiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllList();
    this.incarichiSubcription.add(
      this.setupFilterAndSubscription(this.incarichiService, this.dataSource)
    );
  }
  setupFilterAndSubscription(incarichiService: IncarichiService, dataSource: MatTableDataSource<IIncarichi>) {
    dataSource.filterPredicate = (data: IIncarichi, filter: string) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    };
    return incarichiService.getSearchObservable().subscribe((searchText: string) => {
      dataSource.filter = searchText.trim().toLowerCase();
    });
  }
  ngOnDestroy(): void {
    this.incarichiSubcription.unsubscribe(); // Annulla tutte le sottoscrizioni quando il componente viene distrutto
  }
  getAllList() {
    const idsam = this.incarichiService.getIdsam(); // Ottieni l'idsam dall'URL
    if (!idsam) {
      // Gestisci il caso in cui idsam non sia disponibile
      this.showIdSamError = true;
      console.error('idsam non disponibile');
      return;
    }
    this.isLoading = true;
    this.incarichiService
      .getIncarichi(idsam)
      .subscribe((incarichi: IIncarichi[]) => {
        this.list = [];
        incarichi.forEach((incarico) => {
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
                // tutte le chiamate sono terminate
                this.dataSource = new MatTableDataSource(this.list);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.dataSource.paginator?.firstPage();
                this.isLoading = false;
              }
            });
        });
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
}
