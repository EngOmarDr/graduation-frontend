import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAccountsComponent } from './show-accounts.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { accountingRoutes } from '../../../accounting.routes';

describe('ShowAccountsComponent', () => {
  let component: ShowAccountsComponent;
  let fixture: ComponentFixture<ShowAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowAccountsComponent],
      providers: [
        provideRouter(accountingRoutes),
        provideAnimationsAsync(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
