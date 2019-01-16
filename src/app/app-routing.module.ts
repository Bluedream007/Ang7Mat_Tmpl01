import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SysDashboardComponent} from './sys-dashboard/sys-dashboard.component';
import {SysTreeComponent} from './sys-tree/sys-tree.component';
import {DragDropComponent} from './drag-drop/drag-drop.component';
import {SalesCustomerComponent} from './sales-customer/sales-customer.component';
import {SalesOrderComponent} from './sales-order/sales-order.component';
import {SalesOrder2Component} from './sales-order2/sales-order2.component';
import {SysHomeComponent} from './sys-home/sys-home.component';
import {SysCarouselComponent} from './sys-carousel/sys-carousel.component';

const routes: Routes = [
  { path: 'home', component: SysHomeComponent },
  { path: 'dashboard', component: SysDashboardComponent },
  { path: 'tree', component: SysTreeComponent },
  { path: 'drag', component: DragDropComponent },
  { path: 'customer', component: SalesCustomerComponent},
  { path: 'order2', component: SalesOrder2Component, data: { title: 'List of Orders' }},
  { path: 'order2/:custNo', component: SalesOrder2Component, data: { title: 'List of Orders by CustomerNo' }},
  { path: 'carousel', component: SysCarouselComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
