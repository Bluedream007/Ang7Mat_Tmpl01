import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Order } from '../sales-order2/Order2';

import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = environment.Api_URL;
//const apiUrl = '/classicmodel-ap1/Orders';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

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
  getOrderList (): Observable<Order[]> {

    return this.http.get<Order[]>(apiUrl+'/Orders')
      .pipe(
        tap(orders => console.log('Fetch OrderList')),
        catchError(this.handleError('getOrderList', []))
      );
  }

  getOrderByCustNo(custNo: string): Observable<Order[]> {
    //const url = `${apiUrl}/${id}`;
    let url = apiUrl + '/CustomersJson/' + custNo + '/orderses';
    return this.http.get<Order[]>(url).pipe(
      tap(orders_ => console.log('Fetch OrderList by custNo=', custNo)),
      catchError(this.handleError<Order[]>('Fetch OrderList by custNo=' + custNo))
    );
  }

  getOrderByOrderNo(orderNo: string): Observable<Order[]> {
    //const url = `${apiUrl}/${id}`;
    let url = apiUrl + '/OrdersJson/' + orderNo ;
    return this.http.get<Order[]>(url).pipe(
      tap(orders_ => console.log('Fetch OrderList by orderNo=', orderNo)),
      catchError(this.handleError<Order[]>('Fetch OrderList by orderNo=' + orderNo))
    );
  }


  /*
  addProduct (product): Observable<Product> {
    return this.http.post<Product>(apiUrl, product, httpOptions).pipe(
      tap((product: Product) => console.log(`added product w/ id=${product._id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  updateProduct (id, product): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct (id): Observable<Product> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }
  */
}
