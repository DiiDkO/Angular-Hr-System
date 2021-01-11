"use strict";
exports.__esModule = true;
exports.UserMapper = void 0;
var UserMapper = /** @class */ (function () {
    function UserMapper() {
        this.mappedList = [];
    }
    UserMapper.prototype.map = function (entity, service) {
        var user = {
            id: entity.id,
            username: entity.username,
            firstName: entity.firstName,
            middleName: entity.middleName,
            lastName: entity.lastName,
            email: entity.email,
            manager: null,
            password: entity.password,
            groups: entity.groups,
            active: entity.active
        };
        if (entity.manager)
            this.mapManager(entity.manager, service, user);
        return user;
    };
    ;
    UserMapper.prototype.mapList = function (entityList, service) {
        var _this = this;
        this.mappedList = [];
        entityList.forEach(function (user) {
            _this.mappedList.push(_this.map(user, service));
        });
        return this.mappedList;
    };
    ;
    UserMapper.prototype.mapListById = function (entityList, service) {
        var _this = this;
        this.mappedList = [];
        entityList.forEach(function (userId) {
            service.getUserById(userId)
                .subscribe(function (data) {
                if (data)
                    _this.mappedList.push(data);
            });
        });
        return this.mappedList;
    };
    UserMapper.prototype.mapManager = function (id, userService, user) {
        var _this = this;
        userService.getUserById(id).subscribe(function (data) {
            if (user.id)
                user.manager = _this.map(data, userService);
        });
    };
    UserMapper.prototype.mapUser = function (user) {
        return {
            username: user.username,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            email: user.email,
            manager: user.manager ? user.manager.id : null,
            password: user.password,
            groups: user.groups,
            active: user.active
        };
    };
    return UserMapper;
}());
exports.UserMapper = UserMapper;
