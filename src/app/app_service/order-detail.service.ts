import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Order} from '../sales-order2/Order2';
import {catchError, tap} from 'rxjs/operators';


import {environment} from '../../environments/environment';
import {OrderDetail} from '../sales-order2/OrderDetail';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = environment.Api_URL;

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getOrderDetailListByOrderNo(orderNo: number): Observable<OrderDetail[]> {
    //const url = `${apiUrl}/${id}`;
    let url = apiUrl +  '/OrdersJson/' + orderNo + '/orderdetailses';
    return this.http.get<OrderDetail[]>(url).pipe(
      tap(orders_ => console.log('Fetch OrderDetailList by orderNo='+ orderNo)),
      //catchError(this.handleError<OrderDetail[]>('Fetch OrderDetailList by orderNo=' + orderNo))
      catchError(this.handleError('Fetch OrderDetailList Err: ', []))
    );
  }

}
