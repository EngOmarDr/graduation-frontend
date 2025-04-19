import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSalesComponent } from './show-sales.component';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from '../../app.routes';

describe('ShowSalesComponent', () => {
  let component: ShowSalesComponent;
  let fixture: ComponentFixture<ShowSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowSalesComponent],
      providers: [provideRouter(routes), provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
