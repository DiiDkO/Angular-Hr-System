import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLeaveRequestFormComponent } from './new-leave-request-form.component';

describe('NewLeaveRequestFormComponent', () => {
  let component: NewLeaveRequestFormComponent;
  let fixture: ComponentFixture<NewLeaveRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLeaveRequestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLeaveRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
