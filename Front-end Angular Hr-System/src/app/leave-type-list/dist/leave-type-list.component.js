"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LeaveTypeListComponent = void 0;
var core_1 = require("@angular/core");
var LeaveTypeListComponent = /** @class */ (function () {
    function LeaveTypeListComponent(leaveTypeService, loginService, router) {
        var _this = this;
        this.leaveTypeService = leaveTypeService;
        this.loginService = loginService;
        this.router = router;
        this.isAdmin = false;
        this.loginService.currentUser.subscribe(function (x) { return _this.currentUser = x; });
        this.isAdmin = this.currentUser.roles.includes("admin");
    }
    LeaveTypeListComponent.prototype.ngOnInit = function () {
        if (!this.currentUser)
            this.router.navigate(['/login']);
        else {
            this.label = 'Leave Type';
            this.loadData();
        }
    };
    LeaveTypeListComponent.prototype.loadData = function () {
        var _this = this;
        this.leaveTypeService.getAllLeaveTypes().subscribe(function (data) {
            _this.leaveTypeList = data;
        }, function (error) {
            console.log(error.name + ' ' + error.message);
        });
    };
    LeaveTypeListComponent = __decorate([
        core_1.Component({
            selector: 'app-leave-type-list',
            templateUrl: './leave-type-list.component.html',
            styleUrls: ['./leave-type-list.component.css']
        })
    ], LeaveTypeListComponent);
    return LeaveTypeListComponent;
}());
exports.LeaveTypeListComponent = LeaveTypeListComponent;
