import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdvertisementComponentComponent } from './update-advertisement-component.component';

describe('UpdateAdvertisementComponentComponent', () => {
  let component: UpdateAdvertisementComponentComponent;
  let fixture: ComponentFixture<UpdateAdvertisementComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAdvertisementComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAdvertisementComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
