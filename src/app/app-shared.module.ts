import { NgModule } from '@angular/core';

import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

@NgModule({
  imports:      [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [ ],
  exports:      [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class SharedModule { }
