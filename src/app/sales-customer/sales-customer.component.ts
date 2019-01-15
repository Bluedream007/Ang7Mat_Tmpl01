import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator, MatTableDataSource, MatSort, MatSidenav} from '@angular/material';

import {statusForm} from '../app_comm/app_constants';
import {CustomerService} from '../app_service/customer.service';
import {Customer} from './Customer';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  temp: any;
}

/*
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', temp: null},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', temp: 'test'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', temp: 123},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', temp: 'test2'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', temp: null},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', temp: null},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', temp: null},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', temp: null},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', temp: null},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', temp: null},
];

* Customer example:
[{"customerNumber":103,"customerName":"Atelier 王","contactLastName":"Schmitt 王","contactFirstName":"Carine ","phone":"40.32.2666","addressLine1":"54, rue Royale","addressLine2":null,"city":"Nantes","state":null,"postalCode":"44000","country":"France","creditLimit":21000}]
*/

@Component({
  selector: 'app-sales-customer',
  templateUrl: './sales-customer.component.html',
  styleUrls: ['./sales-customer.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class SalesCustomerComponent implements OnInit, AfterViewInit {
  @ViewChild('paginator1') paginator: MatPaginator;
  //@ViewChild('sortTable') sortTable: MatSort;
  @ViewChild(MatSort) sortTable: MatSort;
  @ViewChild('sideNavTb') sideNavTb: MatSidenav;

  events: string[] = [];
  opened: boolean;
  searchCustInfoValue = 'Clear me';


  currStatusForm: string = statusForm[0];
  // The status of loading for Right Side Nav
  isLoadingResults = true;
  // Option for Query data
  QryOption = 'CustNo';
  displayedColumns: string[] = ['customerNumber','customerName','phone','country', 'FuncList'];
  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'temp'];
  //dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<any>();
  // for expending row detail
  expandedElement: PeriodicElement | null;

  // paginator setting
  lengthRecord = 0;

  /*
  addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    shipping: ['free', Validators.required]
  });
  */
  customerForm = this.fb.group({
    customerNumber: null,
    customerName: [null, Validators.required],
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: null,
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    country: null,
    creditLimit: null
    //shipping: ['free', Validators.required]
  });

  hasUnitNumber = false;

  states = [
    {name: 'Alabama', abbreviation: 'AL'},
    {name: 'Alaska', abbreviation: 'AK'},
    {name: 'American Samoa', abbreviation: 'AS'},
    {name: 'Arizona', abbreviation: 'AZ'},
    {name: 'Arkansas', abbreviation: 'AR'},
    {name: 'California', abbreviation: 'CA'},
    {name: 'Colorado', abbreviation: 'CO'},
    {name: 'Connecticut', abbreviation: 'CT'},
    {name: 'Delaware', abbreviation: 'DE'},
    {name: 'District Of Columbia', abbreviation: 'DC'},
    {name: 'Federated States Of Micronesia', abbreviation: 'FM'},
    {name: 'Florida', abbreviation: 'FL'},
    {name: 'Georgia', abbreviation: 'GA'},
    {name: 'Guam', abbreviation: 'GU'},
    {name: 'Hawaii', abbreviation: 'HI'},
    {name: 'Idaho', abbreviation: 'ID'},
    {name: 'Illinois', abbreviation: 'IL'},
    {name: 'Indiana', abbreviation: 'IN'},
    {name: 'Iowa', abbreviation: 'IA'},
    {name: 'Kansas', abbreviation: 'KS'},
    {name: 'Kentucky', abbreviation: 'KY'},
    {name: 'Louisiana', abbreviation: 'LA'},
    {name: 'Maine', abbreviation: 'ME'},
    {name: 'Marshall Islands', abbreviation: 'MH'},
    {name: 'Maryland', abbreviation: 'MD'},
    {name: 'Massachusetts', abbreviation: 'MA'},
    {name: 'Michigan', abbreviation: 'MI'},
    {name: 'Minnesota', abbreviation: 'MN'},
    {name: 'Mississippi', abbreviation: 'MS'},
    {name: 'Missouri', abbreviation: 'MO'},
    {name: 'Montana', abbreviation: 'MT'},
    {name: 'Nebraska', abbreviation: 'NE'},
    {name: 'Nevada', abbreviation: 'NV'},
    {name: 'New Hampshire', abbreviation: 'NH'},
    {name: 'New Jersey', abbreviation: 'NJ'},
    {name: 'New Mexico', abbreviation: 'NM'},
    {name: 'New York', abbreviation: 'NY'},
    {name: 'North Carolina', abbreviation: 'NC'},
    {name: 'North Dakota', abbreviation: 'ND'},
    {name: 'Northern Mariana Islands', abbreviation: 'MP'},
    {name: 'Ohio', abbreviation: 'OH'},
    {name: 'Oklahoma', abbreviation: 'OK'},
    {name: 'Oregon', abbreviation: 'OR'},
    {name: 'Palau', abbreviation: 'PW'},
    {name: 'Pennsylvania', abbreviation: 'PA'},
    {name: 'Puerto Rico', abbreviation: 'PR'},
    {name: 'Rhode Island', abbreviation: 'RI'},
    {name: 'South Carolina', abbreviation: 'SC'},
    {name: 'South Dakota', abbreviation: 'SD'},
    {name: 'Tennessee', abbreviation: 'TN'},
    {name: 'Texas', abbreviation: 'TX'},
    {name: 'Utah', abbreviation: 'UT'},
    {name: 'Vermont', abbreviation: 'VT'},
    {name: 'Virgin Islands', abbreviation: 'VI'},
    {name: 'Virginia', abbreviation: 'VA'},
    {name: 'Washington', abbreviation: 'WA'},
    {name: 'West Virginia', abbreviation: 'WV'},
    {name: 'Wisconsin', abbreviation: 'WI'},
    {name: 'Wyoming', abbreviation: 'WY'}
  ];

  constructor(private fb: FormBuilder, private api: CustomerService) {}

  ngOnInit() {
    //this.opened = true;

    // get data from api serv
    /*
    this.api.getCustomerList()
      .subscribe(res => {
        this.dataSource.data = res;
        console.log('OnInit - Get OrderData: ', this.dataSource.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    */

  }

  ngAfterViewInit() {
    //console.log('ngAfterViewInit() - this.paginator', this.paginator);
    // use paginator & sort func
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sortTable;

    /*
    this.OrderData.filterPredicate = function(data, filter: string): boolean {
      return data.orderNumber.includes(filter) || data.orderDate.includes(filter);
    };
    */

  }

  onSubmit() {
    //alert('Thanks!');
    this.opened = true;
  }

  // TODO create a Customer class
  protected deleteData(row: Customer) {
    console.log('Current data: ', row.customerNumber);

  }

  protected editData(row: Customer) {
    console.log('Current data: ', row.customerNumber);

    this.customerForm.setValue({
         customerNumber: row.customerNumber,
         customerName: row.customerName,
         firstName: row.contactFirstName,
         lastName: row.contactLastName,
         address: row.addressLine1,
         address2: row.addressLine2,
         city: row.city,
         state: row.state,
         postalCode: row.postalCode,
         country: row.country,
         creditLimit: row.creditLimit,
    });
    this.sideNavTb.close();
  }

  protected queryCustInfo(pQryCustVal: string) {
    this.isLoadingResults = true;
    console.log('QryOption: ', this.QryOption);
    if (this.QryOption !== 'CustNo') {
       // get data from api serv
      this.api.getCustomerList()
        .subscribe(res => {
          this.dataSource.data = res;
          console.log('queryCustInfo() - getCustomerList(): ', this.dataSource.data);
          this.isLoadingResults = false;
          this.lengthRecord = this.dataSource.data.length;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sortTable;

        }, err => {
          console.log(err);
          this.isLoadingResults = false;
        });
    } else {
      this.api.getCustomerById(pQryCustVal)
        .subscribe(res => {
          this.dataSource.data = [res];
          console.log('queryCustInfo() - getCustomerById: ', this.dataSource.data);
          this.isLoadingResults = false;
          this.lengthRecord = this.dataSource.data.length;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sortTable;

        }, err => {
          console.log(err);
          this.isLoadingResults = false;
        });
    } // if

  }
}
