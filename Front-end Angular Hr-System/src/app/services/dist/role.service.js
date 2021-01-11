"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RoleService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var RoleService = /** @class */ (function () {
    function RoleService(httpClient, loginService) {
        this.httpClient = httpClient;
        this.loginService = loginService;
        this.url = "http://localhost:8080/roles";
        this.headers = null;
        this.user = null;
        this.user = this.loginService.currentUserValue;
        this.headers = new http_1.HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Basic ' + btoa(this.user.username + ':' + this.user.password))
            .set('Access-Control-Allow-Origin', 'http://localhost:4200')
            .set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    }
    RoleService.prototype.getAllRoles = function () {
        return this.httpClient.get(this.url, { headers: this.headers });
    };
    RoleService.prototype.getFilteredRoles = function (roleList, exculedRoles) {
        console.log(exculedRoles);
        return roleList.filter(function (x) { return !exculedRoles.find(function (rm) { return (rm.id == x.id); }); });
    };
    RoleService.prototype.getRoleById = function (id) {
        var endpoint = this.url + '/' + id;
        return this.httpClient.get(endpoint, { headers: this.headers });
    };
    RoleService.prototype.addNewRole = function (role) {
        return this.httpClient.post(this.url, { name: role.name }, { headers: this.headers });
    };
    RoleService.prototype.updateRole = function (role) {
        var endpoint = this.url + '/' + role.id;
        return this.httpClient.put(endpoint, { name: role.name }, { headers: this.headers });
    };
    RoleService.prototype.deleteRole = function (id) {
        var endpoint = this.url + '/' + id;
        return this.httpClient["delete"](endpoint, { headers: this.headers });
    };
    RoleService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RoleService);
    return RoleService;
}());
exports.RoleService = RoleService;
