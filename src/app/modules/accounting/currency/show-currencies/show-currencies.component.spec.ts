import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCurrenciesComponent } from './show-currencies.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withViewTransitions } from '@angular/router';
import { accountingRoutes } from '../../accounting.routes';

describe('ShowCurrenciesComponent', () => {
  let component: ShowCurrenciesComponent;
  let fixture: ComponentFixture<ShowCurrenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCurrenciesComponent],
      providers: [provideAnimationsAsync(),provideRouter(accountingRoutes, withViewTransitions()),],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowCurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
