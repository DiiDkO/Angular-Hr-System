"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupRoleFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var GroupRoleFormComponent = /** @class */ (function () {
    function GroupRoleFormComponent(groupService, roleService, loginService, userService, mapper, router, confirmDialogService) {
        var _this = this;
        this.groupService = groupService;
        this.roleService = roleService;
        this.loginService = loginService;
        this.userService = userService;
        this.mapper = mapper;
        this.router = router;
        this.confirmDialogService = confirmDialogService;
        this.isAdmin = false;
        this.errorMessages = [];
        this.groupRoleForm = new forms_1.FormGroup({
            group: new forms_1.FormControl(''),
            groupRole: new forms_1.FormControl('')
        });
        this.loginService.currentUser.subscribe(function (x) { return _this.currentUser = x; });
        this.isAdmin = this.currentUser.roles.includes("admin");
        this.action = this.router.getCurrentNavigation().extras.state.action;
    }
    GroupRoleFormComponent.prototype.ngOnInit = function () {
        if (!this.currentUser)
            this.router.navigate(['/login']);
        else {
            this.loadGroups();
        }
    };
    GroupRoleFormComponent.prototype.loadGroups = function () {
        var _this = this;
        this.groupService.getAllGroups()
            .subscribe(function (data) {
            _this.groupsList = _this.mapper.mapToDtoList(data, _this.userService, _this.roleService, false);
        }, function (error) {
            console.log(error.name + ' ' + error.message);
        });
    };
    GroupRoleFormComponent.prototype.loadGroupRoles = function (event) {
        var group = this.groupRoleForm.getRawValue().group;
        if (this.action == 'add') {
            this.loadAvailableGroupRoles(group);
        }
        else if (this.action == 'delete')
            this.groupRolesList = group.roles;
    };
    GroupRoleFormComponent.prototype.loadAvailableGroupRoles = function (group) {
        var _this = this;
        return this.roleService.getAllRoles()
            .subscribe(function (data) {
            console.log(data);
            if (data)
                _this.groupRolesList = _this.roleService.getFilteredRoles(data, group.roles);
        }, function (error) {
            console.log(error.name + ' ' + error.message);
        });
    };
    GroupRoleFormComponent.prototype.onSubmitValidation = function () {
        this.errorMsg = '';
        this.errorMessages = [];
        var isFormValid = true;
        var groupRoleForm = this.groupRoleForm.getRawValue();
        if (!groupRoleForm.group) {
            isFormValid = false;
            this.errorMessages.push('Group');
        }
        if (!groupRoleForm.groupRole) {
            isFormValid = false;
            this.errorMessages.push('Group Role');
        }
        return isFormValid;
    };
    GroupRoleFormComponent.prototype.addRole = function () {
        var _this = this;
        var isFormValid = this.onSubmitValidation();
        if (isFormValid) {
            var groupRoleForm = this.groupRoleForm.getRawValue();
            this.groupService.addNewGroupRole(groupRoleForm.groupRole.id, groupRoleForm.group.id)
                .subscribe(function (data) {
                if (data && data.id)
                    _this.router.navigate(['/groupList']);
            }, function (error) {
                console.log(error.name + ' ' + error.error);
            });
        }
        else
            this.errorMsg = 'The following fields are mandatory fields and must not be empty: ' + this.errorMessages.join(',');
    };
    GroupRoleFormComponent.prototype.deleteRole = function () {
        var _this = this;
        var isFormValid = this.onSubmitValidation();
        if (isFormValid) {
            this.confirmDialogService.confirm('Confirmation', 'Do you really want to delete it ?')
                .then(function (confirmed) {
                if (confirmed)
                    _this.deleteGroupRole();
            })["catch"](function () { return false; });
        }
        else
            this.errorMsg = 'The following fields are mandatory fields and must not be empty: ' + this.errorMessages.join(',');
    };
    GroupRoleFormComponent.prototype.deleteGroupRole = function () {
        var _this = this;
        var groupRoleForm = this.groupRoleForm.getRawValue();
        this.groupService.deleteGroupRole(groupRoleForm.groupRole.id, groupRoleForm.group.id)
            .subscribe(function (data) {
            if (data && data.id)
                _this.router.navigate(['/groupList']);
        }, function (error) {
            console.log(error.name + ' ' + error.error);
        });
    };
    __decorate([
        core_1.Input()
    ], GroupRoleFormComponent.prototype, "options");
    GroupRoleFormComponent = __decorate([
        core_1.Component({
            selector: 'app-group-role-form',
            templateUrl: './group-role-form.component.html',
            styleUrls: ['./group-role-form.component.css']
        })
    ], GroupRoleFormComponent);
    return GroupRoleFormComponent;
}());
exports.GroupRoleFormComponent = GroupRoleFormComponent;
