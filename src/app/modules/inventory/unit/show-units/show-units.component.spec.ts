import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUnitsComponent } from './show-units.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('ShowUnitsComponent', () => {
  let component: ShowUnitsComponent;
  let fixture: ComponentFixture<ShowUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowUnitsComponent],
      providers: [provideRouter(routes), provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
