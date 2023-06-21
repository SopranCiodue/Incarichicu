import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IIncarichi } from '../models/IIncarichi';
import { IAllegatiList } from '../models/IAllegatiList';
import { environment } from '../environment/environment';
import { Router } from '@angular/router';

const baseUrl: string = environment.urlService;
@Injectable({
  providedIn: 'root',
})
export class IncarichiService {
  private searchSubject: BehaviorSubject<string> = new BehaviorSubject('');
  private selectedIncarichiData = { key_ord: '', haccp: 0 };
  private _idsamPresent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  idsamPresent$ = this._idsamPresent.asObservable();
  private _showIdSamError = new BehaviorSubject<boolean>(false);
 showIdSamError = this._showIdSamError.asObservable();
 

  constructor(private http: HttpClient, private router: Router) {

  }

  getIncarichi(idsam: number): Observable<any> {
    return this.http.get(baseUrl +'GetIncarichi?idsam=' + idsam);
  }

  getAllegatiList(): Observable<any> {
    return this.http.get(baseUrl + 'GetAllegatiList');
  }
  getIdsamObservable(): Observable<number | null> {
    return new Observable(observer => {
      let idsam = this.getIdsamFromUrl();
      if(idsam === null) {
        this._showIdSamError.next(true);
      } else {
        this._showIdSamError.next(false);
      }
      observer.next(idsam);
      observer.complete();
    });
  }
  getIdsam(): number | null {
    let idsam = this.getIdsamFromUrl();
    if(idsam === null) {
      this._showIdSamError.next(true);
      this.updateIdsamStatus(false);
    } else {
      this._showIdSamError.next(false);
      this.updateIdsamStatus(true);
    }
    return idsam;
  }

  private getIdsamFromUrl(): number | null {
    const url = this.router.url;
    const urlSegments = url.split('/');
    const idsamSegment = urlSegments.find(segment => segment.includes('idsam'));
  
    if (idsamSegment) {
      const idsam = idsamSegment.split('=')[1];
      // console.log('idsam ottenuto: ', idsam); // stampa il valore di idsam
  
      if (!isNaN(Number(idsam)) && Number(idsam) > 0)  {
        // console.log('In servizio: showIdSamError è ', this._showIdSamError.value); // stampa il valore di showIdSamError
        return Number(idsam);
      }else {
    // idsam non è presente nell'URL
    // console.log('In servizio: showIdSamError è ', this._showIdSamError.value); // stampa il valore di showIdSamError
    throw new Error('ID SAM non presente');
  }
    }
    // console.log('In servizio: showIdSamError è ', this._showIdSamError.value); // stampa il valore di showIdSamError
    throw new Error('ID SAM non valido');
    return null;
  }

  public getIdsamStatus(): boolean {
    return this._idsamPresent.getValue();
  }

  public updateIdsamStatus(status: boolean): void {
    this._idsamPresent.next(status);
  }
  
  getAllegatiData(
    rientro: number,
    key_ord: string,
    haccp: number,
    contatore: number
  ): Observable<any> {
    return this.http.get(
      baseUrl +
        'GetAllegatiData?rientro=' +
        rientro +
        '&keyord=' +
        key_ord +
        '&haccp=' +
        haccp +
        '&contatore=' +
        contatore,
      { responseType: 'blob' }
    );
  }

  updateSearch(searchText: string) {
    this.searchSubject.next(searchText);
  }

  getSearchObservable(): Observable<string> {
    return this.searchSubject.asObservable();
  }
  getAllegati(keyord: string, haccp: number): Observable<IAllegatiList[]> {
    return this.http.get<IAllegatiList[]>(
      baseUrl + 'GetAllegatiList?keyord=' + keyord + '&haccp=' + haccp
    );
  }
  setSelectedIncarichiData(key_ord: string, haccp: number) {
    this.selectedIncarichiData.key_ord = key_ord;
    this.selectedIncarichiData.haccp = haccp;
  }

  getSelectedIncarichiData() {
    return this.selectedIncarichiData;
  }
}
