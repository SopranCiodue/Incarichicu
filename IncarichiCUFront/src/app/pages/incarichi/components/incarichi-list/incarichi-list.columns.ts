import { Column } from 'devextreme/ui/data_grid';

export const incarichiColumns = (): Column[] => [
  { dataField: 'tipologia' },
  { dataField: 'key_ord', caption: 'Incarico' },
  { dataField: 'servizio' },
  { dataField: 'eseguito' },
  { dataField: 'dataFattTecnico', dataType: 'date', format: 'dd/MM/yyyy' },
  { dataField: 'tecnico' },
  { dataField: 'annullato' },
  { dataField: 'codiceMago' },
  { dataField: 'ragSociale' },
  { dataField: 'prov' },
  { dataField: 'cap' },
  { dataField: 'comune' },
  { dataField: 'indirizzo' },
  { dataField: 'haccp' },
  { dataField: 'allegato' },
];
