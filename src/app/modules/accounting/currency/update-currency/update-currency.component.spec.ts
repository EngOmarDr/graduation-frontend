import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCurrencyComponent } from './update-currency.component';

describe('EditCurrencyComponent', () => {
  let component: UpdateCurrencyComponent;
  let fixture: ComponentFixture<UpdateCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCurrencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
