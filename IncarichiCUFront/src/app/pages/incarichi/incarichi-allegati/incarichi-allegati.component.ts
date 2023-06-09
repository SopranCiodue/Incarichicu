import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as saveAs from 'file-saver';
import { Subscription } from 'rxjs';
import { IAllegatiList } from 'src/app/models/IAllegatiList';
import { IncarichiService } from 'src/app/services/incarichi.service';

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
        })
      ),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class IncarichiAllegatiComponent implements OnInit, OnDestroy {
  @Input() allegati: IAllegatiList[] = [];
  @Input() expandedElement: any;
  isDownloading = false;

  public incarichiSub: Subscription = new Subscription(); // Inizializza la Subscription

  constructor(private incarichiService: IncarichiService) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.incarichiSub.unsubscribe();
  }

  eseguiAzione(rientro: number, allegato: IAllegatiList) {
    this.isDownloading = true;
    const { key_ord, haccp } = this.incarichiService.getSelectedIncarichiData();
    const sub = this.incarichiService
      .getAllegatiData(rientro, key_ord, haccp, allegato.contatore)
      .subscribe(
        (response) => {
          const blob = new Blob([response], {
            type: 'application/x-rar-compressed',
          });
          this.isDownloading = false;
          saveAs(blob, allegato.desc + '.rar');
        },
        (error) => {
          console.error('Error:', error);
          this.isDownloading = false;
        }
      );
    this.incarichiSub.add(sub); // Aggiungi la nuova sottoscrizione all'elenco delle sottoscrizioni
  }
}
