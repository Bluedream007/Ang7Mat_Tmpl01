import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysHomeComponent } from './sys-home.component';

describe('SysHomeComponent', () => {
  let component: SysHomeComponent;
  let fixture: ComponentFixture<SysHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
