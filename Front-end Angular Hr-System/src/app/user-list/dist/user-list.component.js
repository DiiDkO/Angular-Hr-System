"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserListComponent = void 0;
var core_1 = require("@angular/core");
var UserListComponent = /** @class */ (function () {
    function UserListComponent(userService, loginService, router, mapper) {
        var _this = this;
        this.userService = userService;
        this.loginService = loginService;
        this.router = router;
        this.mapper = mapper;
        this.userList = [];
        this.isAdmin = false;
        this.loginService.currentUser.subscribe(function (x) { return _this.currentUser = x; });
        this.isAdmin = this.currentUser.roles.includes("admin");
    }
    UserListComponent.prototype.ngOnInit = function () {
        if (!this.currentUser)
            this.router.navigate(['/login']);
        else {
            this.label = "User";
            this.loadData();
        }
    };
    UserListComponent.prototype.loadData = function () {
        var _this = this;
        this.userService.getAllUsers()
            .subscribe(function (data) {
            _this.userList = _this.mapper.mapList(data, _this.userService);
        }, function (error) {
            console.log(error.name + ' ' + error.message);
        });
    };
    UserListComponent = __decorate([
        core_1.Component({
            selector: 'app-user-list',
            templateUrl: './user-list.component.html',
            styleUrls: ['./user-list.component.css']
        })
    ], UserListComponent);
    return UserListComponent;
}());
exports.UserListComponent = UserListComponent;
