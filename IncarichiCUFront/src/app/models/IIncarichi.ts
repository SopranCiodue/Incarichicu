export interface IIncarichi {
    keyOrd(keyOrd: any): unknown
    codiceMago: string
    sede: string
    ragSociale: string
    prov: string
    cap: string
    comune: string
    indirizzo: string
    key_ord: string
    servizio: string
    eseguito: string
    annullato: string
    dataFattTecnico: Date
    dataFattTecnicoFormatted?: string;
    haccp: number
    hasAttachments?: boolean;
  }

