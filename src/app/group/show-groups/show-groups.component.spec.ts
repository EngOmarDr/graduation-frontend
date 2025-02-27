import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGroupsComponent } from './show-groups.component';

describe('ShowCategoriesComponent', () => {
  let component: ShowGroupsComponent;
  let fixture: ComponentFixture<ShowGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
