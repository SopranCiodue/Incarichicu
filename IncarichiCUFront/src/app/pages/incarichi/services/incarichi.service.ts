import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { IAllegatiList } from '../../../models/allegati-list.interface';
import { environment } from '../../../environment/environment';
import { ActivatedRoute } from '@angular/router';
import { IIncarichi } from '../../../models/incarichi.interface';

@Injectable({
  providedIn: 'root',
})
export class IncarichiService {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);

  private baseUrl = signal(environment.baseUrl);
  private selectedIncarichiData = {
    key_ord: '',
    haccp: 0,
    prendiAllegato: 0,
    tipologia: '',
  };

  getIncarichi(): Observable<IIncarichi[]> {
    return this.route.queryParams.pipe(
      switchMap((params) => {
        const idSam = params['idsam'];
        if (idSam) {
          return this.http.get<IIncarichi[]>(
            `${this.baseUrl()}GetIncarichi?idsam=${idSam}`,
          );
        }
        return of([]);
      }),
    );
  }

  getAllegatiList(
    keyord: string,
    haccp: number,
    prendiAllegato: number,
    tipologia: string,
  ): Observable<IAllegatiList[]> {
    const params = new HttpParams()
      .set('keyord', keyord)
      .set('haccp', haccp.toString())
      .set('prendiAllegato', prendiAllegato.toString())
      .set('tipologia', tipologia);

    return this.http.get<IAllegatiList[]>(`${this.baseUrl()}GetAllegatiList`, {
      params,
    });
  }

  downloadAllegato(
    rientro: number,
    key_ord: string,
    haccp: number,
    contatore: number,
  ): Observable<Blob> {
    const params = new HttpParams()
      .set('rientro', rientro.toString())
      .set('keyord', key_ord)
      .set('haccp', haccp.toString())
      .set('contatore', contatore.toString());

    return this.http.get(`${this.baseUrl()}GetAllegatiData`, {
      params,
      responseType: 'blob',
    });
  }

  setSelectedIncarichiData(
    key_ord: string,
    haccp: number,
    prendiAllegato: number,
    tipologia: string,
  ) {
    this.selectedIncarichiData = { key_ord, haccp, prendiAllegato, tipologia };
  }

  getSelectedIncarichiData() {
    return this.selectedIncarichiData;
  }

  // private _idsamPresent = new BehaviorSubject<boolean>(true);
  // idsamPresent$ = this._idsamPresent.asObservable();
  // showIdSamError = this._showIdSamError.asObservable();

  // getAllegatiList(): Observable<any> {
  //   return this.http.get(this.baseUrl + 'GetAllegatiList');
  // }
  //
  // public getIdsamStatus(): boolean {
  //   return this._idsamPresent.getValue();
  // }
  //
  // public updateIdsamStatus(status: boolean): void {
  //   this._idsamPresent.next(status);
  // }
  //
  // getIdsamObservable(): Observable<number | null> {
  //   return new Observable((observer) => {
  //     let idsam = this.getIdsamFromUrl();
  //     this._showIdSamError.next(idsam === null);
  //     observer.next(idsam);
  //     observer.complete();
  //   });
  // }

  // getIdsam(): number | null {
  //   let idsam = this.getIdsamFromUrl();
  //   this._showIdSamError.next(idsam === null);
  //   // this.updateIdsamStatus(idsam !== null);
  //   return idsam;
  // }

  // private getIdsamFromUrl(): number | null {
  //   const url = this.router.url;
  //   const urlSegments = url.split('/');
  //   const idsamSegment = urlSegments.find((segment) =>
  //     segment.includes('idsam'),
  //   );
  //
  //   if (idsamSegment) {
  //     const idsam = idsamSegment.split('=')[1];
  //
  //     if (!isNaN(Number(idsam)) && Number(idsam) > 0) {
  //       return Number(idsam);
  //     } else {
  //       this._showIdSamError.next(true);
  //       throw new Error('ID SAM non presente');
  //     }
  //   }
  //   this._showIdSamError.next(true);
  //   throw new Error('ID SAM non valido');
  // }
  //
  // updateSearch(searchText: string) {
  //   this.searchSubject.next(searchText);
  // }
  //
  // getSearchObservable(): Observable<string> {
  //   return this.searchSubject.asObservable();
  // }
}
