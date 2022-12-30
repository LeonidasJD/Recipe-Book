import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingConfirmComponent } from './shopping-confirm.component';

describe('ShoppingConfirmComponent', () => {
  let component: ShoppingConfirmComponent;
  let fixture: ComponentFixture<ShoppingConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
