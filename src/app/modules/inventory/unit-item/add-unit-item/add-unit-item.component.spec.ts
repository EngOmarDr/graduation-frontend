import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUnitItemComponent } from './add-unit-item.component';

describe('AddUnitItemComponent', () => {
  let component: AddUnitItemComponent;
  let fixture: ComponentFixture<AddUnitItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUnitItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUnitItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
