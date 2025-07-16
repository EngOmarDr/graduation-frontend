import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdvertisementComponentComponent } from './add-advertisement-component.component';

describe('AddAdvertisementComponentComponent', () => {
  let component: AddAdvertisementComponentComponent;
  let fixture: ComponentFixture<AddAdvertisementComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAdvertisementComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAdvertisementComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
