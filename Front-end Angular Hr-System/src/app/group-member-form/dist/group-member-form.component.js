"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupMemberFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var GroupMemberFormComponent = /** @class */ (function () {
    function GroupMemberFormComponent(groupService, userService, loginService, mapper, roleService, router, confirmDialogService) {
        var _this = this;
        this.groupService = groupService;
        this.userService = userService;
        this.loginService = loginService;
        this.mapper = mapper;
        this.roleService = roleService;
        this.router = router;
        this.confirmDialogService = confirmDialogService;
        this.isAdmin = false;
        this.errorMessages = [];
        this.groupMemberForm = new forms_1.FormGroup({
            group: new forms_1.FormControl('', [forms_1.Validators.required]),
            groupMember: new forms_1.FormControl('', [forms_1.Validators.required])
        });
        this.loginService.currentUser.subscribe(function (x) { return _this.currentUser = x; });
        this.isAdmin = this.currentUser.roles.includes("admin");
        this.action = this.router.getCurrentNavigation().extras.state.action;
    }
    GroupMemberFormComponent.prototype.ngOnInit = function () {
        if (!this.currentUser)
            this.router.navigate(['/login']);
        else {
            this.loadGroups();
        }
    };
    GroupMemberFormComponent.prototype.loadGroupMembers = function (event) {
        var group = this.groupMemberForm.getRawValue().group;
        if (this.action == 'add') {
            this.loadAvailableGroupMembers(group);
        }
        else if (this.action == 'delete')
            this.groupMembersList = group.users;
    };
    GroupMemberFormComponent.prototype.loadGroups = function () {
        var _this = this;
        this.groupService.getAllGroups()
            .subscribe(function (data) {
            _this.groupsList = _this.mapper.mapToDtoList(data, _this.userService, _this.roleService, false);
        }, function (error) {
            console.log(error.name + ' ' + error.message);
        });
    };
    GroupMemberFormComponent.prototype.onSubmitValidation = function () {
        this.errorMsg = '';
        this.errorMessages = [];
        var isFormValid = true;
        var groupMemberForm = this.groupMemberForm.getRawValue();
        if (!groupMemberForm.group) {
            isFormValid = false;
            this.errorMessages.push('Group');
        }
        if (!groupMemberForm.groupMember) {
            isFormValid = false;
            this.errorMessages.push('Group Member');
        }
        return isFormValid;
    };
    GroupMemberFormComponent.prototype.loadAvailableGroupMembers = function (group) {
        var _this = this;
        return this.userService.getAllUsers()
            .subscribe(function (data) {
            if (data)
                _this.groupMembersList = _this.userService.getFilteredUsers(data, group.users);
        }, function (error) {
            console.log(error.name + ' ' + error.message);
        });
    };
    GroupMemberFormComponent.prototype.addMember = function () {
        var _this = this;
        var isFormValid = this.onSubmitValidation();
        if (isFormValid) {
            var groupMemberForm = this.groupMemberForm.getRawValue();
            this.groupService.addNewGroupMember(groupMemberForm.groupMember.id, groupMemberForm.group.id)
                .subscribe(function (data) {
                if (data)
                    _this.router.navigate(['/groupList']);
            }, function (error) {
                console.log(error.name + ' ' + error.message);
            });
        }
        else
            this.errorMsg = 'The following fields are mandatory fields and must not be empty: ' + this.errorMessages.join(',');
    };
    GroupMemberFormComponent.prototype.deleteMember = function () {
        var _this = this;
        var isFormValid = this.onSubmitValidation();
        if (isFormValid) {
            this.confirmDialogService.confirm('Confirmation', 'Do you really want to delete it ?')
                .then(function (confirmed) {
                if (confirmed)
                    _this.deleteGroupMember();
            })["catch"](function () { return false; });
        }
        else
            this.errorMsg = 'The following fields are mandatory fields and must not be empty: ' + this.errorMessages.join(',');
    };
    GroupMemberFormComponent.prototype.deleteGroupMember = function () {
        var _this = this;
        var groupMemberForm = this.groupMemberForm.getRawValue();
        this.groupService.deleteGroupMember(groupMemberForm.groupMember.id, groupMemberForm.group.id)
            .subscribe(function (data) {
            if (data)
                _this.router.navigate(['/groupList']);
        }, function (error) {
            console.log(error.name + ' ' + error.message);
        });
    };
    __decorate([
        core_1.Input()
    ], GroupMemberFormComponent.prototype, "options");
    GroupMemberFormComponent = __decorate([
        core_1.Component({
            selector: 'app-group-member-form',
            templateUrl: './group-member-form.component.html',
            styleUrls: ['./group-member-form.component.css']
        })
    ], GroupMemberFormComponent);
    return GroupMemberFormComponent;
}());
exports.GroupMemberFormComponent = GroupMemberFormComponent;
