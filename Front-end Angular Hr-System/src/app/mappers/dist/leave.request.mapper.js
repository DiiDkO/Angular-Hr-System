"use strict";
exports.__esModule = true;
exports.LeaveRequestMapper = void 0;
var LeaveRequestMapper = /** @class */ (function () {
    function LeaveRequestMapper() {
        this.mappedList = [];
    }
    LeaveRequestMapper.prototype.map = function (entity, userService, leaveTypeService) {
        var leaveReq = {
            id: entity.id,
            startDate: entity.startDate,
            endDate: entity.endDate,
            requestedDays: entity.requestedDays,
            status: entity.status,
            leaveType: null,
            requestor: null,
            approver: null
        };
        if (entity.leaveType) {
            leaveTypeService.getLeaveTypeById(entity.leaveType)
                .subscribe(function (data) {
                if (data)
                    leaveReq.leaveType = data;
            }, function (error) {
                console.log(error.name + ' ' + error.message);
            });
        }
        if (entity.requestor) {
            userService.getUserById(entity.requestor)
                .subscribe(function (data) {
                leaveReq.requestor = data;
            }, function (error) {
                console.log(error.name + ' ' + error.message);
            });
        }
        if (entity.approver) {
            userService.getUserById(entity.approver)
                .subscribe(function (data) {
                leaveReq.approver = data;
            }, function (error) {
                console.log(error.name + ' ' + error.message);
            });
        }
        return leaveReq;
    };
    ;
    LeaveRequestMapper.prototype.mapList = function (entityList, userService, leaveTypeService) {
        var _this = this;
        this.mappedList = [];
        entityList.forEach(function (group) {
            _this.mappedList.push(_this.map(group, userService, leaveTypeService));
        });
        return this.mappedList;
    };
    ;
    return LeaveRequestMapper;
}());
exports.LeaveRequestMapper = LeaveRequestMapper;
