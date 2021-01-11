"use strict";
exports.__esModule = true;
exports.LeaveTypeMapper = void 0;
var LeaveTypeMapper = /** @class */ (function () {
    function LeaveTypeMapper() {
    }
    LeaveTypeMapper.prototype.map = function (leaveTypeId, service) {
        var _this = this;
        service.getLeaveTypeById(leaveTypeId)
            .subscribe(function (data) {
            _this.mappedLeaveType = data;
        });
    };
    ;
    LeaveTypeMapper.prototype.getMappedLeaveType = function () {
        console.log(this.mappedLeaveType);
        return this.mappedLeaveType;
    };
    return LeaveTypeMapper;
}());
exports.LeaveTypeMapper = LeaveTypeMapper;
