import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
//import {MatPaginator} from '@angular/material';
import {MatSort, MatTableDataSource, MatTable} from '@angular/material';

import {OrderDetailService} from '../app_service/order-detail.service';
import {Order} from '../sales-order2/Order2';

@Component({
  selector: 'app-sales-orderdetail',
  templateUrl: './sales-orderdetail.component.html',
  styleUrls: ['./sales-orderdetail.component.scss']
})
export class SalesOrderdetailComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sortOrderDetail: MatSort;
  @ViewChild('OrdDetailTable') OrdDetailTable: MatTable<any>;

  //orderDataInDetail: Order = new Order();
  @Input() orderDataInDetail: Order = new Order();
    //@Input() orderDataInDetail: Order;

  //orderDetailList = new MatTableDataSource<any>();
  @Input() orderDetailList = new MatTableDataSource<any>();
  //displayedDetailColumns: string[] = ['orderLineNumber', 'productCode', 'quantityOrdered', 'priceEach'];
  displayedDetailColumns: string[] = ['productCode', 'quantityOrdered', 'priceEach'];

  constructor(private orderDetailSrvApi: OrderDetailService) { }

  ngOnInit() {
    //console.log('ngOnInit() OrderDetail -', this.orderDataInDetail);
    console.log('ngOnInit() OrderDetail -');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit() - orderDetailList', this.orderDetailList);
    this.orderDetailList.sort = this.sortOrderDetail;

    //this.getOrderDetailListByOrderNo(this.orderDataInDetail);

    /*
    this.OrderData.filterPredicate = function(data, filter: string): boolean {
      return data.orderNumber.includes(filter) || data.orderDate.includes(filter);
    };
    */

  }

  getOrderDetailListByOrderNo(pOrderData: Order) {
    this.orderDataInDetail = pOrderData;
    let OrderNo = pOrderData.orderNumber;

    this.orderDetailSrvApi.getOrderDetailListByOrderNo(OrderNo)
      .subscribe(res => {
        this.orderDetailList.data = res;
        //this.OrdDetailTable.renderRows();
        //this.orderDetailList = new MatTableDataSource(res);
        //console.log('ByOrderNo - Get OrderDetailList: ', this.orderDetailList);
        //this.isLoadingResults = false;
        this.orderDetailList.sort = this.sortOrderDetail;
        //this.expandedElement.orderDetailList = this.orderDetailList;
        //console.log('fetchExpendedContent - expandedElement.orderDetailList: ', this.expandedElement.orderDetailList);
        console.log('getOrderDetailListByOrderNo - orderDetailList: ', this.orderDetailList.data);
        //this.OrdDetailTable.renderRows();
      }, err => {
        console.log(err);
        //this.isLoadingResults = false;

      });
  }

}
