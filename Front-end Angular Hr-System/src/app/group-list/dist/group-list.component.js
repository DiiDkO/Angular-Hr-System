"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupListComponent = void 0;
var core_1 = require("@angular/core");
var GroupListComponent = /** @class */ (function () {
    function GroupListComponent(groupService, roleService, userService, loginService, router, mapper) {
        var _this = this;
        this.groupService = groupService;
        this.roleService = roleService;
        this.userService = userService;
        this.loginService = loginService;
        this.router = router;
        this.mapper = mapper;
        this.isAdmin = false;
        this.navigationExtracts = {
            state: {
                action: ''
            }
        };
        this.loginService.currentUser.subscribe(function (x) { return _this.currentUser = x; });
        this.isAdmin = this.currentUser.roles.includes("admin");
    }
    GroupListComponent.prototype.ngOnInit = function () {
        if (!this.currentUser)
            this.router.navigate(['/login']);
        else {
            this.label = 'Group';
            this.loadData();
        }
    };
    GroupListComponent.prototype.openNewGrMemberForm = function (event) {
        var btnId = event.target.id;
        if (btnId == 'addGrMemberBtn')
            this.navigationExtracts.state.action = 'add';
        else if (btnId == 'deleteGrMemberBtn')
            this.navigationExtracts.state.action = 'delete';
        this.router.navigate(['/groupMember'], this.navigationExtracts);
    };
    GroupListComponent.prototype.openNewGrRoleForm = function (event) {
        var btnId = event.target.id;
        if (btnId == 'addGrRoleBtn')
            this.navigationExtracts.state.action = 'add';
        else if (btnId == 'deleteGrRoleBtn')
            this.navigationExtracts.state.action = 'delete';
        this.router.navigate(['/groupRole'], this.navigationExtracts);
    };
    GroupListComponent.prototype.loadData = function () {
        var _this = this;
        this.groupService.getAllGroups()
            .subscribe(function (data) {
            _this.groupList = _this.mapper.mapToDtoList(data, _this.userService, _this.roleService, false);
        }, function (error) {
            console.log(error.name + ' ' + error.message);
        });
    };
    GroupListComponent = __decorate([
        core_1.Component({
            selector: 'app-group-list',
            templateUrl: './group-list.component.html',
            styleUrls: ['./group-list.component.css']
        })
    ], GroupListComponent);
    return GroupListComponent;
}());
exports.GroupListComponent = GroupListComponent;
