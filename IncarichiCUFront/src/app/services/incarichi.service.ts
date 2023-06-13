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
  constructor(private http: HttpClient, private router: Router) {}

  getIncarichi(idsam: number): Observable<any> {
    return this.http.get(baseUrl +'GetIncarichi?idsam=' + idsam);
  }

  getAllegatiList(): Observable<any> {
    return this.http.get(baseUrl + 'GetAllegatiList');
  }
  getIdsam(): number {
    const url = this.router.url;
    const urlSegments = url.split('/');
    const idsamSegment = urlSegments.find(segment => segment.includes('idsam'));

    if (idsamSegment) {
      const idsam = idsamSegment.split('=')[1];
      return Number(idsam);
    }

    return null!;
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
