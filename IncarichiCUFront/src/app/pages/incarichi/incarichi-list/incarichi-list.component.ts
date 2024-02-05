import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
import { AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-incarichi-list',
  templateUrl: './incarichi-list.component.html',
  styleUrls: ['./incarichi-list.component.scss'],
})
export class IncarichiListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'tipologia',
    'key_ord',
    'servizio',
    'eseguito',
    'dataFattTecnico',
    'tecnico',
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
    'tipologia',
    'partecipante',
    'dataCorso',
    'codiceFiscale',
    'mansione',
    'modalità',
    'desc',
    'DataAllegato',
    'Data_Rientro',
  ];
  public allegatoSortAsc = true;
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
  public  allegatoColumnLoaded = false;
  isRowClicked: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;


  constructor(
    private router: Router,
    private incarichiService: IncarichiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private changeDetectorRefs: ChangeDetectorRef
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
  ngAfterContentChecked(): void {
    // Aggiorna il flag solo se la riga è espansa
    if (this.expandedElement !== null && !this.isRowClicked) {
      this.isRowClicked = true;

    }
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

    this.incarichiService.getIncarichi(idsam).subscribe((incarichi: IIncarichi[]) => {
      this.list = [];
      this.totaleIncarichi = incarichi.length;
      this.gestioneViewIncarichi();

      const allegatiRequests = incarichi.map(incarico =>
        this.incarichiService.getAllegati(incarico.key_ord, incarico.haccp, incarico.prendiAllegato, incarico.tipologia)
          .pipe(map(allegati => ({ incarico, allegati })))
      );

      forkJoin(allegatiRequests).subscribe(results => {
        results.forEach(({ incarico, allegati }) => {
          const hasAttachments = allegati && allegati.length > 0;
          const incaricoWithAllegati = {
            ...incarico,
            allegati,
            dataFattTecnicoFormatted: incarico.dataFattTecnico
              ? formatDate(incarico.dataFattTecnico, 'dd/MM/yyyy', 'en-US')
              : '',
            hasAttachments: hasAttachments && !allegati.some(a => a.tipologia.toLowerCase() === 'partecipante')
          };
          this.list.push(incaricoWithAllegati);
          this.listAllegati.push(...allegati);
        });

        this.dataSource.data = this.list;
        this.isLoading = false;
        this.changeDetectorRefs.detectChanges();
      });
    });
  }

  toggleExpandedElement(row: IIncarichi) {
    this.expandedElement = this.expandedElement === row ? null : row;

    if (this.expandedElement) {
      this.incarichiService.setSelectedIncarichiData(row.key_ord, row.haccp, row.prendiAllegato, row.tipologia);
      this.incarichiSubcription.add(
        this.incarichiService
          .getAllegati(row.key_ord, row.haccp, row.prendiAllegato, row.tipologia)
          .subscribe((resp) => {
            this.listAllegati = resp;
            this.changeDetectorRefs.detectChanges();
          })
      );
    }
  }



// Modifica la funzione hasAttachments
hasAttachments(incarico: IIncarichi, listAllegati: IAllegatiList[]): boolean {
  // Filtra le righe di IAllegatiList che corrispondono alla chiave_ord dell'incarico
  const matchingRows = listAllegati.filter(allegato => allegato.keyord === incarico.key_ord);

  // Controlla se esiste almeno una riga con Tipologia uguale a 'PARTECIPANTE'
  return matchingRows.some(allegato => allegato.tipologia.toLowerCase() === 'partecipante');
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
sortData(column: string) {
    this.dataSource.data.sort((a, b) => {
      if (a.hasAttachments && !b.hasAttachments) {
        return this.allegatoSortAsc ? 1 : -1;
      } else if (!a.hasAttachments && b.hasAttachments) {
        return this.allegatoSortAsc ? -1 : 1;
      } else {
        return 0;
      }
    });
    this.allegatoSortAsc = !this.allegatoSortAsc;
    this.dataSource._updateChangeSubscription();
  }
}

