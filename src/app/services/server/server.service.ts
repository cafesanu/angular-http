import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { IServer } from '../models/server.model';

// tslint:disable-next-line: no-unsafe-any
@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private _uri: string = 'https://ng-http-117be.firebaseio.com/data.json';
  constructor(
    private _http: Http // tslint:disable-line deprecation
  ) {
  }

  public postServers(servers: IServer[]): Observable<Response> { // tslint:disable-line deprecation
    return this._http.post(this._uri, servers);
  }

  public putServers(servers: IServer[]): Observable<Response> { // tslint:disable-line deprecation
    return this._http.put(this._uri, servers);
  }

  public getServers(): Observable<IServer[]> { // tslint:disable-line deprecation
    return this._http.get(this._uri)
      .pipe(
        map((response: Response) => {
          return response.json();
        }),
        catchError((error: Response) => throwError('bad!'))
      );
  }

  public getAppName(): Observable<Response> {
    return this._http.get('https://ng-http-117be.firebaseio.com/appName.json')
      .pipe(
        map((response: Response) => {
          return response.json();
        })
      );

  }
}
