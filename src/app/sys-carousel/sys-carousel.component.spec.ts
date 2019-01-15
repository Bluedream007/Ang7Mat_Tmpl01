import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysCarouselComponent } from './sys-carousel.component';

describe('SysCarouselComponent', () => {
  let component: SysCarouselComponent;
  let fixture: ComponentFixture<SysCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
