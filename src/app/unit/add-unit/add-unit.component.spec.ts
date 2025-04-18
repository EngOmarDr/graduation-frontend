import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUnitComponent } from './add-unit.component';

describe('AddGroupComponent', () => {
  let component: AddUnitComponent;
  let fixture: ComponentFixture<AddUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUnitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
