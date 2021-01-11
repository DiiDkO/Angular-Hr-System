"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LeaveTypeService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var LeaveTypeService = /** @class */ (function () {
    function LeaveTypeService(httpService, loginService) {
        this.httpService = httpService;
        this.loginService = loginService;
        this.url = "http://localhost:8080/leave_types";
        this.headers = null;
        this.user = null;
        this.user = this.loginService.currentUserValue;
        this.headers = new http_1.HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Basic ' + btoa(this.user.username + ':' + this.user.password))
            .set('Access-Control-Allow-Origin', 'http://localhost:4200')
            .set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    }
    LeaveTypeService.prototype.getAllLeaveTypes = function () {
        return this.httpService.get(this.url, { headers: this.headers });
    };
    LeaveTypeService.prototype.getLeaveTypeById = function (id) {
        var endpoint = this.url + '/' + id;
        return this.httpService.get(endpoint, { headers: this.headers });
    };
    LeaveTypeService.prototype.addNewLeaveType = function (leaveType) {
        return this.httpService.post(this.url, { name: leaveType.name }, { headers: this.headers });
    };
    LeaveTypeService.prototype.updateLeaveType = function (leaveType) {
        var endpoint = this.url + '/' + leaveType.id;
        return this.httpService.put(endpoint, { name: leaveType.name }, { headers: this.headers });
    };
    LeaveTypeService.prototype.deleteLeaveType = function (id) {
        var endpoint = this.url + '/' + id;
        return this.httpService["delete"](endpoint, { headers: this.headers });
    };
    LeaveTypeService.prototype.reloadPage = function (router) {
        router.navigateByUrl('/', { skipLocationChange: true })
            .then(function () { return router.navigate(['/leaveTypeList']); });
    };
    LeaveTypeService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LeaveTypeService);
    return LeaveTypeService;
}());
exports.LeaveTypeService = LeaveTypeService;
