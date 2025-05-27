import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUnitItemComponent } from './update-unit-item.component';

describe('UpdateUnitItemComponent', () => {
  let component: UpdateUnitItemComponent;
  let fixture: ComponentFixture<UpdateUnitItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUnitItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUnitItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
