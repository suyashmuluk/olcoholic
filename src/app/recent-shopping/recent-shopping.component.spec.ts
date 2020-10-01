import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentShoppingComponent } from './recent-shopping.component';

describe('RecentShoppingComponent', () => {
  let component: RecentShoppingComponent;
  let fixture: ComponentFixture<RecentShoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentShoppingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
