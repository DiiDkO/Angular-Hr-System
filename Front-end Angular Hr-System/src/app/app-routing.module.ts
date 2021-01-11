import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupMemberFormComponent } from './group-member-form/group-member-form.component';
import { GroupRoleFormComponent } from './group-role-form/group-role-form.component';
import { HomeComponent } from './home/home.component';
import { LeaveRequestListComponent } from './leave-request-list/leave-request-list.component';
import { LeaveTypeListComponent } from './leave-type-list/leave-type-list.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NewGroupFormComponent } from './new-group-form/new-group-form.component';
import { NewLeaveRequestFormComponent } from './new-leave-request-form/new-leave-request-form.component';
import { NewLeaveTypeFormComponent } from './new-leave-type-form/new-leave-type-form.component';
import { NewRoleFormComponent } from './new-role-form/new-role-form.component';
import { NewUserFormComponent } from './new-user-form/new-user-form.component';
import { RoleListComponent } from './role-list/role-list.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'login'
  },
  {
    path:'login',
    component:LoginFormComponent
  },
  {
    path: 'home',
  component: HomeComponent
  },
  {
    path: 'userList',
    component: UserListComponent
  }, 
{
  path:'groupList',
  component: GroupListComponent
},
{
  path:'groupMember',
  component: GroupMemberFormComponent
},
{
  path:'groupRole',
  component: GroupRoleFormComponent
},
{
  path:'roleList',
  component: RoleListComponent
},
{
  path:'leaveTypeList',
  component: LeaveTypeListComponent
},
{
  path: 'leaveRequestList',
  component: LeaveRequestListComponent
},
{
  path: 'createNewUser',
  component:NewUserFormComponent
},
{
  path:'createNewGroup',
  component:NewGroupFormComponent
},
{
  path:'createNewRole',
  component: NewRoleFormComponent
},
{
  path:'createNewLeaveType',
  component: NewLeaveTypeFormComponent
},
{
  path:'createNewLeaveRequest',
  component: NewLeaveRequestFormComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
