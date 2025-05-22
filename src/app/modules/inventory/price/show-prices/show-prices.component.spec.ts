import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPricesComponent } from './show-prices.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from '../../app.routes';

describe('ShowPricesComponent', () => {
  let component: ShowPricesComponent;
  let fixture: ComponentFixture<ShowPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPricesComponent],
      providers: [provideRouter(routes), provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
