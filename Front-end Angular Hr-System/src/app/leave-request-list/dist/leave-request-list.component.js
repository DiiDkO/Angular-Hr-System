"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LeaveRequestListComponent = void 0;
var core_1 = require("@angular/core");
var LeaveRequestListComponent = /** @class */ (function () {
    function LeaveRequestListComponent(leaveReqService, userService, leaveTypeService, loginService, router, mapper) {
        var _this = this;
        this.leaveReqService = leaveReqService;
        this.userService = userService;
        this.leaveTypeService = leaveTypeService;
        this.loginService = loginService;
        this.router = router;
        this.mapper = mapper;
        this.label = 'Leave Request';
        this.loginService.currentUser.subscribe(function (x) { return _this.currentUser = x; });
    }
    LeaveRequestListComponent.prototype.ngOnInit = function () {
        if (!this.currentUser)
            this.router.navigate(['/login']);
        else
            this.loadData();
    };
    LeaveRequestListComponent.prototype.loadData = function () {
        var _this = this;
        this.leaveReqService.getAllLeaveRequest()
            .subscribe(function (data) {
            _this.leaveRequestList = _this.mapper.mapList(data, _this.userService, _this.leaveTypeService);
        }, function (error) {
            console.log(error.name + ' ' + error.message);
        });
    };
    LeaveRequestListComponent = __decorate([
        core_1.Component({
            selector: 'app-leave-request-list',
            templateUrl: './leave-request-list.component.html',
            styleUrls: ['./leave-request-list.component.css']
        })
    ], LeaveRequestListComponent);
    return LeaveRequestListComponent;
}());
exports.LeaveRequestListComponent = LeaveRequestListComponent;
