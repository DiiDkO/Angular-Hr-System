"use strict";
exports.__esModule = true;
exports.RoleMapper = void 0;
var RoleMapper = /** @class */ (function () {
    function RoleMapper() {
        this.mappedList = [];
    }
    RoleMapper.prototype.map = function (roleId, service, isForUpdate) {
        var _this = this;
        service.getRoleById(roleId)
            .subscribe(function (data) {
            if (isForUpdate)
                _this.mappedList.push(data.id);
            else
                _this.mappedList.push(data);
        });
    };
    RoleMapper.prototype.mapList = function (entityList, service, isForUpdate) {
        var _this = this;
        this.mappedList = [];
        entityList.forEach(function (roleId) {
            _this.map(roleId, service, isForUpdate);
        });
        return this.mappedList;
    };
    ;
    return RoleMapper;
}());
exports.RoleMapper = RoleMapper;
