import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAllegatiList } from '../models/IAllegatiList';
import { environment } from '../environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IncarichiService {
  private baseUrl = environment.urlService;
  private searchSubject: BehaviorSubject<string> = new BehaviorSubject('');
  private selectedIncarichiData = { key_ord: '', haccp: 0, prendiAllegato: 0, tipologia: '' };
  private _idsamPresent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  idsamPresent$ = this._idsamPresent.asObservable();
  private _showIdSamError = new BehaviorSubject<boolean>(false);
  showIdSamError = this._showIdSamError.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  getIncarichi(idsam: number): Observable<any> {
    return this.http.get(this.baseUrl + 'GetIncarichi?idsam=' + idsam);
  }

  getAllegatiList(): Observable<any> {
    return this.http.get(this.baseUrl + 'GetAllegatiList');
  }

  getIdsamObservable(): Observable<number | null> {
    return new Observable(observer => {
      let idsam = this.getIdsamFromUrl();
      this._showIdSamError.next(idsam === null);
      observer.next(idsam);
      observer.complete();
    });
  }

  getIdsam(): number | null {
    let idsam = this.getIdsamFromUrl();
    this._showIdSamError.next(idsam === null);
    this.updateIdsamStatus(idsam !== null);
    return idsam;
  }

  private getIdsamFromUrl(): number | null {
    const url = this.router.url;
    const urlSegments = url.split('/');
    const idsamSegment = urlSegments.find(segment => segment.includes('idsam'));

    if (idsamSegment) {
      const idsam = idsamSegment.split('=')[1];

      if (!isNaN(Number(idsam)) && Number(idsam) > 0) {
        return Number(idsam);
      } else {
        this._showIdSamError.next(true);
        throw new Error('ID SAM non presente');
      }
    }
    this._showIdSamError.next(true);
    throw new Error('ID SAM non valido');
  }

  public getIdsamStatus(): boolean {
    return this._idsamPresent.getValue();
  }

  public updateIdsamStatus(status: boolean): void {
    this._idsamPresent.next(status);
  }

  getAllegatiData(rientro: number, key_ord: string, haccp: number, contatore: number): Observable<any> {
    return this.http.get(
      this.baseUrl +
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

  getAllegati(keyord: string, haccp: number, prendiAllegato: number, tipologia: string): Observable<IAllegatiList[]> {
    return this.http.get<IAllegatiList[]>(
      this.baseUrl +
        'GetAllegatiList?keyord=' +
        keyord +
        '&haccp=' +
        haccp +
        '&prendiAllegato=' +
        prendiAllegato +
        '&tipologia=' +
        tipologia
    );
  }

  setSelectedIncarichiData(key_ord: string, haccp: number, prendiAllegato: number, tipologia: string) {
    this.selectedIncarichiData = { key_ord, haccp, prendiAllegato, tipologia };
  }

  getSelectedIncarichiData() {
    return this.selectedIncarichiData;
  }
}
