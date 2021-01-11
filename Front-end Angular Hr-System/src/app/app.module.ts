import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserService } from './services/user.service';
import { UserListComponent } from './user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import { GroupListComponent } from './group-list/group-list.component';
import { RoleListComponent } from './role-list/role-list.component';
import { LeaveTypeListComponent } from './leave-type-list/leave-type-list.component';
import { LeaveRequestListComponent } from './leave-request-list/leave-request-list.component';
import { NewUserFormComponent } from './new-user-form/new-user-form.component';
import { NewGroupFormComponent } from './new-group-form/new-group-form.component';
import { NewRoleFormComponent } from './new-role-form/new-role-form.component';
import { NewLeaveTypeFormComponent } from './new-leave-type-form/new-leave-type-form.component';
import { NewLeaveRequestFormComponent } from './new-leave-request-form/new-leave-request-form.component';
import { GroupService } from './services/group.service';
import { LeaveTypeService } from './services/leave-type.service';
import { RoleService } from './services/role.service';
import { LeaveRequestService } from './services/leave-request.service';
import { HttpClientModule } from '@angular/common/http';
import { ModalBasicComponent } from './modal-basic/modal-basic.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { GroupMemberFormComponent } from './group-member-form/group-member-form.component';
import { GroupRoleFormComponent } from './group-role-form/group-role-form.component';
import { UserMapper } from './mappers/user.mapper';
import { GroupMapper } from './mappers/group.mapper';
import { RoleMapper } from './mappers/role.mapper';
import { LeaveRequestMapper } from './mappers/leave.request.mapper';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UserListComponent,
    GroupListComponent,
    RoleListComponent,
    LeaveTypeListComponent,
    LeaveRequestListComponent,
    NewUserFormComponent,
    NewGroupFormComponent,
    NewRoleFormComponent,
    NewLeaveTypeFormComponent,
    NewLeaveRequestFormComponent,
    ModalBasicComponent,
    LoginFormComponent,
    GroupMemberFormComponent,
    GroupRoleFormComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
  ],
  exports:[
  ],
  providers: [UserService,GroupService,LeaveTypeService, RoleService, LeaveRequestService,UserMapper,GroupMapper,RoleMapper, LeaveRequestMapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
