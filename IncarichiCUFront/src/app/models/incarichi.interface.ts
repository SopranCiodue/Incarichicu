export interface IIncarichi {
  tipologia: string;
  codiceMago: string;
  sede: string;
  ragSociale: string;
  prov: string;
  cap: string;
  comune: string;
  indirizzo: string;
  key_ord: string;
  servizio: string;
  eseguito: string;
  annullato: string;
  dataFattTecnico: null;
  haccp: number;
  prendiAllegato: number;
  tecnico: string;
  hasAttachments?: boolean;
}
