import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesComponent } from './add-sales.component';

describe('AddSalesComponent', () => {
  let component: AddSalesComponent;
  let fixture: ComponentFixture<AddSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
