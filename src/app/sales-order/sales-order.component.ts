import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { SalesOrderDataSource } from './sales-order-datasource';
import {Order} from '../sales-order2/Order2';
import {OrderService} from '../app_service/order.service';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.scss'],
})
export class SalesOrderComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild('input') input: ElementRef;
  //dataSource: SalesOrderDataSource;
  //OrderData: Order;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  // displayedColumns = ['id', 'name'];
  displayedColumns: string[] = ['orderNumber', 'orderDate', 'status'];
  //data: Order[] = [];
  dataSource = new SalesOrderDataSource(this.orderApi, this.paginator, this.sort);

  constructor(private orderApi: OrderService) { }
  //constructor() { }

  ngOnInit() {
    //this.dataSource = new SalesOrderDataSource(this.paginator, this.sort);

    // this.OrderData = this.route.snapshot.data["course"];

    //this.dataSource = new SalesOrderDataSource(this.orderApi, this.paginator, this.sort);

    //this.dataSource.loadLessons(this.course.id, '', 'asc', 0, 3);
    //this.dataSource.loadOrderList(this.data);


    this.orderApi.getOrderList()
      .subscribe(res => {
        this.dataSource.data = res;
        console.log('ngOnInit - getOrderList: ', this.dataSource.data);
        //this.isLoadingResults = false;

        //console.log('new dataSrouce with: ' + this.data);
        //this.dataSource = new SalesOrderDataSource(this.data, this.paginator, this.sort);

      }, err => {
        console.log(err);
        //this.isLoadingResults = false;
      });


    //this.dataSource.getPagedData( this.dataSource.getSortedData(this.dataSource.data) );


  }

  ngAfterViewInit() {

  }
}
