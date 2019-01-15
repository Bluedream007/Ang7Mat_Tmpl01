import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {Order} from '../sales-order2/Order2';
import {OrderService} from '../app_service/order.service';

// TODO: Replace this with your own data model type
/*
export interface SalesOrderItem {
  name: string;
  id: number;
}
*/
/*
export interface SalesOrderItem {
  OrderDateItm: number;
  OrderNumberItm: number;
  OrderStatus: string;
}
*/
// TODO: replace this with real data from your application
/*
const EXAMPLE_DATA: SalesOrderItem[] = [
  {id: 1, name: 'Hydrogen'},
  {id: 2, name: 'Helium'},
  {id: 3, name: 'Lithium'},
  {id: 4, name: 'Beryllium'},
  {id: 5, name: 'Boron'},
  {id: 6, name: 'Carbon'},
  {id: 7, name: 'Nitrogen'},
  {id: 8, name: 'Oxygen'},
  {id: 9, name: 'Fluorine'},
  {id: 10, name: 'Neon'},
  {id: 11, name: 'Sodium'},
  {id: 12, name: 'Magnesium'},
  {id: 13, name: 'Aluminum'},
  {id: 14, name: 'Silicon'},
  {id: 15, name: 'Phosphorus'},
  {id: 16, name: 'Sulfur'},
  {id: 17, name: 'Chlorine'},
  {id: 18, name: 'Argon'},
  {id: 19, name: 'Potassium'},
  {id: 20, name: 'Calcium'},
];
*/

/**
 * Data source for the SalesOrder view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
//export class SalesOrderDataSource extends DataSource<SalesOrderItem> {
export class SalesOrderDataSource extends DataSource<Order> {
  //data: SalesOrderItem[] = EXAMPLE_DATA;
  data: Order[] = [];

  /*
  constructor(private paginator: MatPaginator, private sort: MatSort) {
     super();
  }
  */

  constructor(private orderSrv: OrderService, private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /*
  constructor(private orderList: Order[], private paginator: MatPaginator, private sort: MatSort) {
    super();
    this.data = orderList;
  }
  */

  /*
  loadOrderList(dataList: Order[]) {

    this.orderSrv.getOrderList()
      .subscribe(res => {
        this.data = res;
        dataList = res;
        console.log('call loadOrderList(): ' + this.data);
        //this.isLoadingResults = false;
      }, err => {
        console.log(err);
        //this.isLoadingResults = false;
      });
  }
  */

  private onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  //connect(): Observable<SalesOrderItem[]> {
  connect(): Observable<Order[]> {
    //return this.orderSrv.getOrderList();

    //this.data = this.orderList;
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.

    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));

  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  //private getPagedData(data: SalesOrderItem[]) {
  getPagedData(data: Order[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  //private getSortedData(data: SalesOrderItem[]) {
  getSortedData(data: Order[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'orderDate': return compare(a.orderDate, b.orderDate, isAsc);
        case 'orderNumber': return compare(+a.orderNumber, +b.orderNumber, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
