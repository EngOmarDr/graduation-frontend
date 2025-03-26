import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUnitsComponent } from './show-units.component';

describe('ShowUnitsComponent', () => {
  let component: ShowUnitsComponent;
  let fixture: ComponentFixture<ShowUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowUnitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
