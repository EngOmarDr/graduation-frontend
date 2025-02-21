import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWarehousesComponent } from './show-warehouses.component';

describe('ShowWarehousesComponent', () => {
  let component: ShowWarehousesComponent;
  let fixture: ComponentFixture<ShowWarehousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowWarehousesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowWarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
