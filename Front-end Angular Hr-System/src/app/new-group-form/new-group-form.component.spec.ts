import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGroupFormComponent } from './new-group-form.component';

describe('NewGroupFormComponent', () => {
  let component: NewGroupFormComponent;
  let fixture: ComponentFixture<NewGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGroupFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
