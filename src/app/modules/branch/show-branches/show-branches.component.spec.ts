import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBranchesComponent } from './show-branches.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('ShowBranchesComponent', () => {
  let component: ShowBranchesComponent;
  let fixture: ComponentFixture<ShowBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowBranchesComponent],
      providers: [provideRouter(routes), provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
