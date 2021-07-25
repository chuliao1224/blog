import { Observable, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const BASE_URL = 'http:localhost:8000/';

const HTTP_OPTIONS = {
  header: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};

const DEFAULT_TIME_out = 5000;

export default class http {

  constructor(private http: HttpClient) {

  }

  get(api: string, options: any = HTTP_OPTIONS, callback: Function) {
    const url = api.startsWith('http') ? api : BASE_URL + api;
    this.http.get(url, options)
      .pipe(timeout(DEFAULT_TIME_out), catchError(this.handleError('http get error', url)))
      .subscribe((response: any) => this.handlerResponse(callback, response));
  }


  post(api: string, params: any = {}, options: any = HTTP_OPTIONS, callback: Function) {
    const url = api.startsWith('http') ? api : BASE_URL + api;
    this.http.post(url, params, options)
      .pipe(timeout(DEFAULT_TIME_out), catchError(this.handleError('http post error', url)))
      .subscribe((response: any) => this.handlerResponse(callback, response));
  }


  handlerResponse(callback: Function, response: any) {
    callback && callback(response);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
