import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRoleFormComponent } from './group-role-form.component';

describe('GroupRoleFormComponent', () => {
  let component: GroupRoleFormComponent;
  let fixture: ComponentFixture<GroupRoleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupRoleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
