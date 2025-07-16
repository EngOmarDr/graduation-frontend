import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPriceDisplayComponent } from './show-price-display.component';

describe('ShowPriceDisplayComponent', () => {
  let component: ShowPriceDisplayComponent;
  let fixture: ComponentFixture<ShowPriceDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPriceDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPriceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
