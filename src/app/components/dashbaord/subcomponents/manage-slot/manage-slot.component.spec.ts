import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSlotComponent } from './manage-slot.component';

describe('ManageSlotComponent', () => {
  let component: ManageSlotComponent;
  let fixture: ComponentFixture<ManageSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
