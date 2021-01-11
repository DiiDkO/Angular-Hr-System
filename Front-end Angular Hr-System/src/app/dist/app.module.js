"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var navbar_component_1 = require("./navbar/navbar.component");
var user_service_1 = require("./services/user.service");
var user_list_component_1 = require("./user-list/user-list.component");
var home_component_1 = require("./home/home.component");
var group_list_component_1 = require("./group-list/group-list.component");
var role_list_component_1 = require("./role-list/role-list.component");
var leave_type_list_component_1 = require("./leave-type-list/leave-type-list.component");
var leave_request_list_component_1 = require("./leave-request-list/leave-request-list.component");
var new_user_form_component_1 = require("./new-user-form/new-user-form.component");
var new_group_form_component_1 = require("./new-group-form/new-group-form.component");
var new_role_form_component_1 = require("./new-role-form/new-role-form.component");
var new_leave_type_form_component_1 = require("./new-leave-type-form/new-leave-type-form.component");
var new_leave_request_form_component_1 = require("./new-leave-request-form/new-leave-request-form.component");
var group_service_1 = require("./services/group.service");
var leave_type_service_1 = require("./services/leave-type.service");
var role_service_1 = require("./services/role.service");
var leave_request_service_1 = require("./services/leave-request.service");
var http_1 = require("@angular/common/http");
var modal_basic_component_1 = require("./modal-basic/modal-basic.component");
var login_form_component_1 = require("./login-form/login-form.component");
var group_member_form_component_1 = require("./group-member-form/group-member-form.component");
var group_role_form_component_1 = require("./group-role-form/group-role-form.component");
var user_mapper_1 = require("./mappers/user.mapper");
var group_mapper_1 = require("./mappers/group.mapper");
var role_mapper_1 = require("./mappers/role.mapper");
var leave_request_mapper_1 = require("./mappers/leave.request.mapper");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                navbar_component_1.NavbarComponent,
                home_component_1.HomeComponent,
                user_list_component_1.UserListComponent,
                group_list_component_1.GroupListComponent,
                role_list_component_1.RoleListComponent,
                leave_type_list_component_1.LeaveTypeListComponent,
                leave_request_list_component_1.LeaveRequestListComponent,
                new_user_form_component_1.NewUserFormComponent,
                new_group_form_component_1.NewGroupFormComponent,
                new_role_form_component_1.NewRoleFormComponent,
                new_leave_type_form_component_1.NewLeaveTypeFormComponent,
                new_leave_request_form_component_1.NewLeaveRequestFormComponent,
                modal_basic_component_1.ModalBasicComponent,
                login_form_component_1.LoginFormComponent,
                group_member_form_component_1.GroupMemberFormComponent,
                group_role_form_component_1.GroupRoleFormComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                ng_bootstrap_1.NgbModule,
                app_routing_module_1.AppRoutingModule,
            ],
            exports: [],
            providers: [user_service_1.UserService, group_service_1.GroupService, leave_type_service_1.LeaveTypeService, role_service_1.RoleService, leave_request_service_1.LeaveRequestService, user_mapper_1.UserMapper, group_mapper_1.GroupMapper, role_mapper_1.RoleMapper, leave_request_mapper_1.LeaveRequestMapper],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
