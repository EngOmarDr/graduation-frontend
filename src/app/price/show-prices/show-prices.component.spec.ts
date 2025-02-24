import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPricesComponent } from './show-prices.component';

describe('ShowPricesComponent', () => {
  let component: ShowPricesComponent;
  let fixture: ComponentFixture<ShowPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPricesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
