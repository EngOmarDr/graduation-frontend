import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAccountsComponent } from './show-accounts.component';

describe('ShowAccountsComponent', () => {
  let component: ShowAccountsComponent;
  let fixture: ComponentFixture<ShowAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowAccountsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
