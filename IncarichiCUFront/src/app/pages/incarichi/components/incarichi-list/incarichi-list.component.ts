import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { incarichiColumns } from './incarichi-list.columns';
import { IncarichiService } from '../../services/incarichi.service';
import { map } from 'rxjs/operators';
import ArrayStore from 'devextreme/data/array_store';
import { toSignal } from '@angular/core/rxjs-interop';
import { IIncarichi } from '../../../../models/incarichi.interface';

@Component({
  selector: 'app-incarichi-list',
  imports: [DxDataGridModule],
  templateUrl: './incarichi-list.component.html',
  styleUrl: './incarichi-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncarichiListComponent {
  private readonly incarichiService = inject(IncarichiService);

  private createArrayStore = (data: IIncarichi[] = []) =>
    new ArrayStore({ data, key: 'key_ord' });

  refreshBtnOpts = signal({
    hint: 'Aggiorna dati',
    text: 'Aggiorna dati',
    icon: 'refresh',
    onClick: () => console.log('Aggiorna dati'),
  });

  incarichiColumns = incarichiColumns();

  incarichiList = toSignal(
    this.incarichiService.getIncarichi().pipe(map(this.createArrayStore)),
    {
      initialValue: this.createArrayStore(),
    },
  );

  onSelectionChanged(event: DxDataGridTypes.SelectionChangedEvent): void {
    void event.component.expandRow(event.currentSelectedRowKeys[0]);
  }
}
