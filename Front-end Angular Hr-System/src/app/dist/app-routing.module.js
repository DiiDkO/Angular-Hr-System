"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var group_list_component_1 = require("./group-list/group-list.component");
var group_member_form_component_1 = require("./group-member-form/group-member-form.component");
var group_role_form_component_1 = require("./group-role-form/group-role-form.component");
var home_component_1 = require("./home/home.component");
var leave_request_list_component_1 = require("./leave-request-list/leave-request-list.component");
var leave_type_list_component_1 = require("./leave-type-list/leave-type-list.component");
var login_form_component_1 = require("./login-form/login-form.component");
var new_group_form_component_1 = require("./new-group-form/new-group-form.component");
var new_leave_request_form_component_1 = require("./new-leave-request-form/new-leave-request-form.component");
var new_leave_type_form_component_1 = require("./new-leave-type-form/new-leave-type-form.component");
var new_role_form_component_1 = require("./new-role-form/new-role-form.component");
var new_user_form_component_1 = require("./new-user-form/new-user-form.component");
var role_list_component_1 = require("./role-list/role-list.component");
var user_list_component_1 = require("./user-list/user-list.component");
var routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: login_form_component_1.LoginFormComponent
    },
    {
        path: 'home',
        component: home_component_1.HomeComponent
    },
    {
        path: 'userList',
        component: user_list_component_1.UserListComponent
    },
    {
        path: 'groupList',
        component: group_list_component_1.GroupListComponent
    },
    {
        path: 'groupMember',
        component: group_member_form_component_1.GroupMemberFormComponent
    },
    {
        path: 'groupRole',
        component: group_role_form_component_1.GroupRoleFormComponent
    },
    {
        path: 'roleList',
        component: role_list_component_1.RoleListComponent
    },
    {
        path: 'leaveTypeList',
        component: leave_type_list_component_1.LeaveTypeListComponent
    },
    {
        path: 'leaveRequestList',
        component: leave_request_list_component_1.LeaveRequestListComponent
    },
    {
        path: 'createNewUser',
        component: new_user_form_component_1.NewUserFormComponent
    },
    {
        path: 'createNewGroup',
        component: new_group_form_component_1.NewGroupFormComponent
    },
    {
        path: 'createNewRole',
        component: new_role_form_component_1.NewRoleFormComponent
    },
    {
        path: 'createNewLeaveType',
        component: new_leave_type_form_component_1.NewLeaveTypeFormComponent
    },
    {
        path: 'createNewLeaveRequest',
        component: new_leave_request_form_component_1.NewLeaveRequestFormComponent
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
