import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IIncarichi } from '../models/IIncarichi';
import { IAllegatiList } from '../models/IAllegatiList';

@Injectable({
  providedIn: 'root',
})
export class IncarichiService {
  private baseUrl = 'http://localhost:5000/';
  private searchSubject: BehaviorSubject<string> = new BehaviorSubject('');
  private selectedIncarichiData = { key_ord: '', haccp: 0 };
  constructor(private http: HttpClient) {}

  getIncarichi(): Observable<any> {
    return this.http.get(this.baseUrl + 'GetIncarichi');
  }

  getAllegatiList(): Observable<any> {
    return this.http.get(this.baseUrl + 'GetAllegatiList');
  }

  getAllegatiData(
    rientro: number,
    key_ord: string,
    haccp: number,
    contatore: number
  ): Observable<any> {
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
  getAllegati(keyord: string, haccp: number): Observable<IAllegatiList[]> {
    return this.http.get<IAllegatiList[]>(
      this.baseUrl + 'GetAllegatiList?keyord=' + keyord + '&haccp=' + haccp
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
