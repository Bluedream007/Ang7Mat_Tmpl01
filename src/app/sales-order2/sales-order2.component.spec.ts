import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrder2Component } from './sales-order2.component';

describe('SalesOrder2Component', () => {
  let component: SalesOrder2Component;
  let fixture: ComponentFixture<SalesOrder2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOrder2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrder2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
