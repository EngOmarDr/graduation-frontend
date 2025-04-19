import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPurchasesComponent } from './show-purchases.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('ShowPurchasesComponent', () => {
  let component: ShowPurchasesComponent;
  let fixture: ComponentFixture<ShowPurchasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPurchasesComponent],
      providers: [provideRouter(routes), provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
