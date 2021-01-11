"use strict";
exports.__esModule = true;
exports.GroupMapper = void 0;
var user_mapper_1 = require("./user.mapper");
var role_mapper_1 = require("./role.mapper");
var GroupMapper = /** @class */ (function () {
    function GroupMapper() {
        this.mappedList = [];
    }
    GroupMapper.prototype.mapToDto = function (entity, userService, roleService, isForUpdate) {
        var userMapper = new user_mapper_1.UserMapper();
        var roleMapper = new role_mapper_1.RoleMapper();
        var group = {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            roles: [],
            users: [],
            manager: null
        };
        if (entity.manager)
            group.manager = userMapper.mapManager(entity.manager, userService, group);
        if (entity.roles)
            group.roles = roleMapper.mapList(entity.roles, roleService, isForUpdate);
        if (entity.users)
            group.users = userMapper.mapListById(entity.users, userService);
        return group;
    };
    ;
    GroupMapper.prototype.mapToDtoList = function (entityList, userService, roleService, isForUpdate) {
        var _this = this;
        this.mappedList = [];
        entityList.forEach(function (group) {
            _this.mappedList.push(_this.mapToDto(group, userService, roleService, isForUpdate));
        });
        return this.mappedList;
    };
    ;
    GroupMapper.prototype.mapToEntity = function (group) {
        var roleIds = [];
        var userIds = [];
        if (group.roles.length > 0)
            group.roles.forEach(function (role) { return roleIds.push(role.id); });
        if (group.members.length > 0)
            group.members.forEach(function (member) { return userIds.push(member.id); });
        return {
            name: group.name,
            email: group.email,
            roles: roleIds,
            users: [],
            manager: group.manager ? group.manager.id : null
        };
    };
    return GroupMapper;
}());
exports.GroupMapper = GroupMapper;
