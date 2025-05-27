import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUnitItemComponent } from './show-unit-item.component';

describe('ShowUnitItemComponent', () => {
  let component: ShowUnitItemComponent;
  let fixture: ComponentFixture<ShowUnitItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowUnitItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowUnitItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
