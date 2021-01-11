"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var GroupService = /** @class */ (function () {
    function GroupService(groupHttp, mapper, loginService) {
        this.groupHttp = groupHttp;
        this.mapper = mapper;
        this.loginService = loginService;
        this.headers = null;
        this.user = null;
        this.url = "http://localhost:8080/groups";
        this.userUrl = "http://localhost:8080/users";
        this.addGroupRoleRelUrl = "/create/group_role";
        this.deleteGroupRoleUrl = "/delete/group_role";
        this.addGroupUserRelUrl = "/group_joiner";
        this.deleteGroupUserRelUrl = "/group_leaver";
        this.user = this.loginService.currentUserValue;
        this.headers = new http_1.HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Basic ' + btoa(this.user.username + ':' + this.user.password))
            .set('Access-Control-Allow-Origin', 'http://localhost:4200')
            .set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    }
    GroupService.prototype.getAllGroups = function () {
        return this.groupHttp.get(this.url, { headers: this.headers });
    };
    GroupService.prototype.addNewGroup = function (group) {
        return this.groupHttp.post(this.url, this.mapper.mapToEntity(group), { headers: this.headers });
    };
    GroupService.prototype.addNewGroupMember = function (userId, groupId) {
        var endpoint = this.userUrl + this.addGroupUserRelUrl + '/' + userId + '/' + groupId;
        return this.groupHttp.post(endpoint, {}, { headers: this.headers });
    };
    GroupService.prototype.deleteGroupMember = function (userId, groupId) {
        var endpoint = this.userUrl + this.deleteGroupUserRelUrl + '/' + userId + '/' + groupId;
        return this.groupHttp.post(endpoint, {}, { headers: this.headers });
    };
    GroupService.prototype.addNewGroupRole = function (roleId, groupId) {
        var endpoint = this.url + this.addGroupRoleRelUrl + '/' + roleId + '/' + groupId;
        return this.groupHttp.post(endpoint, {}, { headers: this.headers });
    };
    GroupService.prototype.deleteGroupRole = function (roleId, groupId) {
        var endpoint = this.url + this.deleteGroupRoleUrl + '/' + roleId + '/' + groupId;
        return this.groupHttp.post(endpoint, {}, { headers: this.headers });
    };
    GroupService.prototype.updateGroup = function (group) {
        var endpoint = this.url + '/' + group.id;
        console.log(this.mapper.mapToEntity(group));
        return this.groupHttp.put(endpoint, this.mapper.mapToEntity(group), { headers: this.headers });
    };
    GroupService.prototype.deleteGroup = function (id) {
        var endpoint = this.url + '/' + id;
        return this.groupHttp["delete"](endpoint, { headers: this.headers });
    };
    GroupService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], GroupService);
    return GroupService;
}());
exports.GroupService = GroupService;
