import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecouponComponent } from './managecoupon.component';

describe('ManagecouponComponent', () => {
  let component: ManagecouponComponent;
  let fixture: ComponentFixture<ManagecouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagecouponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagecouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
