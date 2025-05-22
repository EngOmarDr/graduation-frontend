import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGroupsComponent } from './show-groups.component';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from '../../app.routes';

describe('ShowGroupsComponent', () => {
  let component: ShowGroupsComponent;
  let fixture: ComponentFixture<ShowGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowGroupsComponent],
      providers: [provideRouter(routes), provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
