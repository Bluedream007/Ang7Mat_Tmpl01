import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// For Angular Material Animation
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SysMenuComponent } from './sys-menu/sys-menu.component';
import { LayoutModule } from '@angular/cdk/layout';
// For Angular Material
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule} from '@angular/material';
import { MatCardModule, MatMenuModule, MatTreeModule, MatInputModule, MatSelectModule, MatRadioModule} from '@angular/material';
import { MatProgressSpinnerModule, MatFormFieldModule} from '@angular/material';
//import {CdkTableModule} from '@angular/cdk/table';
//import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { SharedModule } from './app-shared.module';
// For App
import { SysDashboardComponent } from './sys-dashboard/sys-dashboard.component';
import { SysTreeComponent } from './sys-tree/sys-tree.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SalesCustomerComponent } from './sales-customer/sales-customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { SysHomeComponent } from './sys-home/sys-home.component';
import { SysCarouselComponent } from './sys-carousel/sys-carousel.component';
import { SalesOrder2Component } from './sales-order2/sales-order2.component';
import { SalesOrderdetailComponent } from './sales-orderdetail/sales-orderdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    SysMenuComponent,
    SysDashboardComponent,
    SysTreeComponent,
    DragDropComponent,
    SalesCustomerComponent,
    SalesOrderComponent,
    SysHomeComponent,
    SysCarouselComponent,
    SalesOrder2Component,
    SalesOrderdetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    DragDropModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTreeModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    // CdkTableModule,
    SharedModule
    //MatTableModule,
    //MatPaginatorModule,
    //MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
