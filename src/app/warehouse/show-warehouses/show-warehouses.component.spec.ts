import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWarehousesComponent } from './show-warehouses.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from '../../app.routes';

describe('ShowWarehousesComponent', () => {
  let component: ShowWarehousesComponent;
  let fixture: ComponentFixture<ShowWarehousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowWarehousesComponent],
      providers: [provideRouter(routes, withViewTransitions()), provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowWarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
