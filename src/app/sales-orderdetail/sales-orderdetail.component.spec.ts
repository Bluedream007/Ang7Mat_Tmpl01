import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderdetailComponent } from './sales-orderdetail.component';

describe('SalesOrderdetailComponent', () => {
  let component: SalesOrderdetailComponent;
  let fixture: ComponentFixture<SalesOrderdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOrderdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
