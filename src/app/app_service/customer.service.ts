import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Customer} from '../sales-customer/Customer';
import {catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = environment.Api_URL;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // Get data by Proxy server(proxy.conf.json) in DEV envir.
  getCustomerList(): Observable<Customer[]> {

    return this.http.get<Customer[]>(apiUrl+'/CustomersJson')
      .pipe(
        tap(customerList => console.log('Fetch Customer Data List')),
        catchError(this.handleError('getCustomerList', []))
      );
  }

  getCustomerById(custId: string): Observable<Customer[]> {

    return this.http.get<Customer[]>(apiUrl+'/CustomersJson/'+custId)
      .pipe(
        tap(customerList => console.log('Fetch Customer Data')),
        catchError(this.handleError('getCustomerData', []))
      );
  }
}
