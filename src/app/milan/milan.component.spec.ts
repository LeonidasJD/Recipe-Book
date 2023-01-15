import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilanComponent } from './milan.component';

describe('MilanComponent', () => {
  let component: MilanComponent;
  let fixture: ComponentFixture<MilanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MilanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
