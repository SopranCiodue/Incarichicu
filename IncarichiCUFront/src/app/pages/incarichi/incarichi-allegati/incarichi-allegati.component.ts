import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import FileSaver from 'file-saver';
import { Subscription } from 'rxjs';
import { IAllegatiList } from 'src/app/models/IAllegatiList';
import { IncarichiService } from 'src/app/services/incarichi.service';
import { DatePipe, NgIf } from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-incarichi-allegati',
  templateUrl: './incarichi-allegati.component.html',
  styleUrls: ['./incarichi-allegati.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({
          height: '0px',
          minHeight: '0',
          display: 'none',
          visibility: 'hidden',
        }),
      ),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ),
    ]),
  ],
  imports: [
    NgIf,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatIcon,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    DatePipe,
  ],
})
export class IncarichiAllegatiComponent implements OnInit, OnDestroy {
  @Input() allegati: IAllegatiList[] = [];
  @Input() expandedElement: any;
  isDownloading = false;
  uniqueDownloadId: number = 0;
  isCurrentFileDownloading: { [key: string]: boolean } = {};
  public incarichiSub: Subscription = new Subscription(); // Inizializza la Subscription

  constructor(private incarichiService: IncarichiService) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.incarichiSub.unsubscribe();
  }
  //la doppia negazione !! converte in booleano: se trova partecipante è vero
  isPartecipante(tipologia: string): boolean {
    return !!tipologia && tipologia.toLowerCase() === 'partecipante';
  }
  eseguiAzione(rientro: number, allegato: IAllegatiList): void {
    const fileId = allegato.contatore.toString(); // Usiamo l'id del file come chiave nell'oggetto

    if (this.isCurrentFileDownloading[fileId]) {
      // Se il file è già in fase di download, esci
      return;
    }

    const { key_ord, haccp } = this.incarichiService.getSelectedIncarichiData();
    const sub = this.incarichiService
      .getAllegatiData(rientro, key_ord, haccp, allegato.contatore)
      .subscribe(
        (response) => {
          const blob = new Blob([response], {
            type: 'application/x-rar-compressed',
          });
          FileSaver(blob, allegato.desc + '.rar');
        },
        (error) => {
          console.error('Error:', error);
        },
        () => {
          this.isCurrentFileDownloading[fileId] = false; // Imposta lo stato del download su false dopo il completamento
          this.isDownloading = false;
        },
      );

    this.isCurrentFileDownloading[fileId] = true; // Imposta lo stato del download su true per il file corrente
    this.isDownloading = true;
    this.incarichiSub.add(sub);
  }
}
