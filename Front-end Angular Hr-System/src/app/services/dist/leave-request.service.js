"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LeaveRequestService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var LeaveRequestService = /** @class */ (function () {
    function LeaveRequestService(httpService, loginService) {
        this.httpService = httpService;
        this.loginService = loginService;
        this.headers = null;
        this.user = null;
        this.url = 'http://localhost:8080/leave_requests';
        this.user = this.loginService.currentUserValue;
        this.headers = new http_1.HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Basic ' + btoa(this.user.username + ':' + this.user.password))
            .set('Access-Control-Allow-Origin', 'http://localhost:4200')
            .set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    }
    LeaveRequestService.prototype.getAllLeaveRequest = function () {
        return this.httpService.get(this.url, { headers: this.headers });
    };
    LeaveRequestService.prototype.addNewLeaveRequest = function (leaveRequest) {
        return this.httpService.post(this.url, leaveRequest, { headers: this.headers });
    };
    LeaveRequestService.prototype.updateLeaveRequest = function (id, leaveRequest) {
        var endpoint = this.url + '/' + id;
        return this.httpService.put(endpoint, leaveRequest, { headers: this.headers });
    };
    LeaveRequestService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LeaveRequestService);
    return LeaveRequestService;
}());
exports.LeaveRequestService = LeaveRequestService;
