import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//Import the switchMap operator because you need it later to process the Observable route parameters.
import { switchMap } from 'rxjs/operators';

import { OrderService } from '../app_service/order.service';
import { Order } from './Order2';
//import {PeriodicElement} from '../sales-customer/sales-customer.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {OrderDetailService} from '../app_service/order-detail.service';
import {OrderDetail} from './OrderDetail';
import {SalesOrderdetailComponent} from '../sales-orderdetail/sales-orderdetail.component';

/*
 * Show Order + OrderDetail Data at same page
 * - The Parent component show the Order info.
 *   The Child component show the OrderDetail info.
 * - Use @Input to transfer data between parent and child
 * - Use multi mat-SortTable at same page(because there is problem about multi mat-SortTable).


*/

/*
export interface ExpElement {
  orderNumber: number;
  requiredDate: number;
  shippedDate: number;
  orderDetailList: any;
}
*/


@Component({
  selector: 'app-sales-order2',
  templateUrl: './sales-order2.component.html',
  styleUrls: ['./sales-order2.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class SalesOrder2Component implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) orderPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  //@ViewChild(MatSort) sortOrderDetail: MatSort;
  //@ViewChild('sort') sort: MatSort;
  //@ViewChild(MatSort) sortOrderDetail: MatSort;
  @ViewChild(SalesOrderdetailComponent) childSalesOrderdetail: SalesOrderdetailComponent;

  displayedColumns: string[] = ['orderNumber', 'orderDate', 'status', 'btnFuncList'];
  //data: Order[] = [];
  OrderData = new MatTableDataSource<any>();
  isLoadingResults = false;
  custNo: string;
  QryOption = 'OrderNo';
  //expandedElement: ExpendedElement | null;
  expandedElement: Order | null;
  //expandedElement: ExpElement | null;
  //showExpendedElement = false;
  /*: OrderDetail[] = [];
  orderDetailList = new MatTableDataSource<any>();
  displayedDetailColumns: string[] = ['orderLineNumber', 'productCode', 'quantityOrdered', 'priceEach'];
  */
  orderDetailInOrder = new MatTableDataSource<any>();

  constructor(
    private orderSrvApi: OrderService,
    //private orderDetailSrvApi: OrderDetailService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // for test
    // this.getTestData();

    this.custNo = this.route.snapshot.paramMap.get('custNo');
    console.log('paramter custNo: ', this.custNo);


    this.expandedElement = new Order();
    //this.expandedElement.requiredDate = 0;
    //this.expandedElement.shippedDate = 0;


    if (this.custNo !== null) {

      this.isLoadingResults = true;
      this.getOrderListByCustNo(this.custNo);

      /*
      this.api.getOrderByCustNo(this.custNo)
        .subscribe(res => {
          this.OrderData.data = res;
          console.log('OnInit - Get OrderData: ', this.OrderData.data);
          this.isLoadingResults = false;
        }, err => {
          console.log(err);
          this.isLoadingResults = false;
        });
      */
    }



    // get data from api serv
    /*
    this.api.getOrderList()
      .subscribe(res => {
        this.OrderData.data = res;
        console.log('OnInit - Get OrderData: ', this.OrderData.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    */
    // Filter setting
    this.OrderData.filterPredicate = function(data, filter: string): boolean {
      //return data.orderNumber.includes(filter) || data.orderDate.toString() === filter;
      // return data.orderNumber.toString() === filter;
      return data.orderNumber.toString().includes(filter);
    };

  } // ngOnInit()

  ngAfterViewInit() {
    //this.data.paginator = this.paginator;
    //this.data.sort = this.sort;
    console.log('ngAfterViewInit() - this.paginator', this.orderPaginator);
    this.OrderData.paginator = this.orderPaginator;
    this.OrderData.sort = this.sort;
    //this.orderDetailList.sort = this.sortOrderDetail;

    /*
    this.OrderData.filterPredicate = function(data, filter: string): boolean {
      return data.orderNumber.includes(filter) || data.orderDate.includes(filter);
    };
    */

  }

  applyFilter(filterValue: string) {
     this.OrderData.filter = filterValue;
    //this.OrderData.data.orderNumber.filter = filterValue;

  }

  private deleteData(row: Order) {

  }

  private editData(row: Order) {

  }

  // Process --------------------------------------------- *

  private getOrderListTopNo() {
    this.orderSrvApi.getOrderList()
      .subscribe(res => {
        this.OrderData.data = res;
        console.log('TopNo - Get OrderData: ', this.OrderData.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });

  }

  private getOrderListByCustNo(pCustNo: string) {
    this.orderSrvApi.getOrderByCustNo(pCustNo)
      .subscribe(res => {
        this.OrderData.data = res;
        console.log('ByCustNo - Get OrderData: ', this.OrderData.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
        this.OrderData.data = [];
      });
  }

  private getOrderByOrderNo(pOrderNo: string) {
    this.orderSrvApi.getOrderByOrderNo(pOrderNo)
      .subscribe(res => {
        this.OrderData.data = [res];
        console.log('ByOrderNo - Get OrderData: ', this.OrderData.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
        this.OrderData.data = [];
      });
  }

  protected queryOrderInfo(pQryInputVal: string) {
     this.isLoadingResults = true;
     console.log('QryOption: ', this.QryOption);
     if (this.QryOption === 'CustNo') {
        this.getOrderListByCustNo(pQryInputVal);
     } else if (this.QryOption === 'OrderNo') {
        this.getOrderByOrderNo(pQryInputVal);
     } else {
       this.getOrderListTopNo();
     }
  }

  // TODO: not finished
  protected fetchExpendedContent(row: any){
    console.log('fetchExpendedContent - OrderNo: ', row.orderNumber);

    if (this.expandedElement !== row ) {
      this.expandedElement = row;
      //this.isLoadingResults = true;
      //this.getOrderDetailListByOrderNo(row.orderNumber);
      this.childSalesOrderdetail.getOrderDetailListByOrderNo(row);

      //console.log('fetchExpendedContent - expandedElement.orderDetailList: ', this.expandedElement.orderDetailList);

    } else {
      //this.expandedElement = null;
    }




    /*
    this.expandedElement.orderNumber = row.orderNumber;
    this.expandedElement.requiredDate = row.requiredDate;
    this.expandedElement.shippedDate = row.shippedDate;
    */



    //this.expandedElement.orderDetailList = this.orderDetailList;
  }

  // Processes for OrderDetail ------------------------ *
  /*
  protected getOrderDetailListByOrderNo(pOrderNo: number) {

    this.orderDetailSrvApi.getOrderDetailListByOrderNo(pOrderNo)
      .subscribe(res => {
        //this.orderDetailList.data = res;
        this.orderDetailList = new MatTableDataSource(res);
        //console.log('ByOrderNo - Get OrderDetailList: ', this.orderDetailList);
        this.isLoadingResults = false;
        this.orderDetailList.sort = this.sortOrderDetail;
        //this.expandedElement.orderDetailList = this.orderDetailList;
        //console.log('fetchExpendedContent - expandedElement.orderDetailList: ', this.expandedElement.orderDetailList);
        console.log('fetchExpendedContent - orderDetailList: ', this.orderDetailList.data);
      }, err => {
        console.log(err);
        this.isLoadingResults = false;

      });
  }
  */

  private getTestData() {
    /*
    this.data = [{"orderNumber":10100,"orderDate":1041811200000,"requiredDate":1042416000000,"shippedDate":1042156800000,"status":"Shipped"},
      {"orderNumber":10101,"orderDate":1042070400000,"requiredDate":1042848000000,"shippedDate":1042243200000,"status":"Shipped"},
      {"orderNumber":10102,"orderDate":1042156800000,"requiredDate":1042848000000,"shippedDate":1042502400000,"status":"Shipped"},
      {"orderNumber":10103,"orderDate":1043798400000,"requiredDate":1044576000000,"shippedDate":1044144000000,"status":"Shipped"}
    ];
    */

    /*
    this.data = [{"orderNumber":10100,"orderDate":1041811200000,"requiredDate":1042416000000,"shippedDate":1042156800000,"status":"Shipped","comments":null,"customers":{"customerNumber":363,"customerName":"Online Diecast Creations Co.","contactLastName":"Young","contactFirstName":"Dorothy","phone":"6035558647","addressLine1":"2304 Long Airport Avenue","addressLine2":null,"city":"Nashua","state":"NH","postalCode":"62005","country":"USA","creditLimit":114200}},
      {"orderNumber":10101,"orderDate":1042070400000,"requiredDate":1042848000000,"shippedDate":1042243200000,"status":"Shipped","comments":"Check on availability.","customers":{"customerNumber":128,"customerName":"Blauer See Auto, Co.","contactLastName":"Keitel","contactFirstName":"Roland","phone":"+49 69 66 90 2555","addressLine1":"Lyonerstr. 34","addressLine2":null,"city":"Frankfurt","state":null,"postalCode":"60528","country":"Germany","creditLimit":59700}},
      {"orderNumber":10102,"orderDate":1042156800000,"requiredDate":1042848000000,"shippedDate":1042502400000,"status":"Shipped","comments":null,"customers":{"customerNumber":181,"customerName":"Vitachrome Inc.","contactLastName":"Frick","contactFirstName":"Michael","phone":"2125551500","addressLine1":"2678 Kingston Rd.","addressLine2":"Suite 101","city":"NYC","state":"NY","postalCode":"10022","country":"USA","creditLimit":76400}},
      {"orderNumber":10103,"orderDate":1043798400000,"requiredDate":1044576000000,"shippedDate":1044144000000,"status":"Shipped","comments":null,"customers":{"customerNumber":121,"customerName":"Baane Mini Imports","contactLastName":"Bergulfsen","contactFirstName":"Jonas ","phone":"07-98 9555","addressLine1":"Erling Skakkes gate 78","addressLine2":null,"city":"Stavern","state":null,"postalCode":"4110","country":"Norway","creditLimit":81700}}
    ];
    */

  }

}
