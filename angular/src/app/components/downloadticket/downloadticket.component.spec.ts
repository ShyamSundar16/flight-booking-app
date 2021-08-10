import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadticketComponent } from './downloadticket.component';

describe('DownloadticketComponent', () => {
  let component: DownloadticketComponent;
  let fixture: ComponentFixture<DownloadticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadticketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
