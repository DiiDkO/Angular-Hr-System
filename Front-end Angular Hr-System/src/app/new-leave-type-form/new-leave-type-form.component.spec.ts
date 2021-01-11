import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLeaveTypeFormComponent } from './new-leave-type-form.component';

describe('NewLeaveTypeFormComponent', () => {
  let component: NewLeaveTypeFormComponent;
  let fixture: ComponentFixture<NewLeaveTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLeaveTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLeaveTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
