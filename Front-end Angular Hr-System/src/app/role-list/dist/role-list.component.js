"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RoleListComponent = void 0;
var core_1 = require("@angular/core");
var RoleListComponent = /** @class */ (function () {
    function RoleListComponent(roleService, loginService, router) {
        var _this = this;
        this.roleService = roleService;
        this.loginService = loginService;
        this.router = router;
        this.isAdmin = false;
        this.loginService.currentUser.subscribe(function (x) { return _this.currentUser = x; });
        this.isAdmin = this.currentUser.roles.includes("admin");
    }
    RoleListComponent.prototype.ngOnInit = function () {
        if (!this.currentUser)
            this.router.navigate(['/home']);
        else {
            this.label = "Role";
            this.loadData();
        }
    };
    RoleListComponent.prototype.loadData = function () {
        var _this = this;
        this.roleService.getAllRoles()
            .subscribe(function (data) { _this.roleList = data; }, function (error) {
            console.log(error.name + ' ' + error.message);
        });
    };
    RoleListComponent = __decorate([
        core_1.Component({
            selector: 'app-role-list',
            templateUrl: './role-list.component.html',
            styleUrls: ['./role-list.component.css']
        })
    ], RoleListComponent);
    return RoleListComponent;
}());
exports.RoleListComponent = RoleListComponent;
