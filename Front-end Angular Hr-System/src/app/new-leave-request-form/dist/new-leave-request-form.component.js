"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NewLeaveRequestFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var NewLeaveRequestFormComponent = /** @class */ (function () {
    function NewLeaveRequestFormComponent(userService, leaveRequestService, leaveTypeService, loginService, userMapper, router) {
        var _this = this;
        this.userService = userService;
        this.leaveRequestService = leaveRequestService;
        this.leaveTypeService = leaveTypeService;
        this.loginService = loginService;
        this.userMapper = userMapper;
        this.router = router;
        this.errorMsg = '';
        this.errorMessages = [];
        this.leaveRequestForm = new forms_1.FormGroup({
            id: new forms_1.FormControl({ value: '', disabled: true }),
            startDate: new forms_1.FormControl('', [forms_1.Validators.required,]),
            endDate: new forms_1.FormControl('', [forms_1.Validators.required]),
            requestedDays: new forms_1.FormControl({ value: '', disabled: true }),
            leaveType: new forms_1.FormControl('', [forms_1.Validators.required]),
            status: new forms_1.FormControl('Requested', [forms_1.Validators.required]),
            requestor: new forms_1.FormControl('', [forms_1.Validators.required]),
            approver: new forms_1.FormControl({ value: '', disabled: true })
        });
        this.loginService.currentUser.subscribe(function (x) { return _this.currentUser = x; });
    }
    NewLeaveRequestFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.currentUser)
            this.router.navigate(['/login']);
        else {
            this.leaveRequestForm.get('startDate').valueChanges.subscribe(function (startDate) {
                var endDate = _this.leaveRequestForm.getRawValue().endDate;
                _this.calculateRequestedDays(startDate, endDate);
                if (_this.requestedDays < 1 && endDate.day)
                    _this.invalidStartDate = true;
                else {
                    _this.invalidStartDate = false;
                    _this.invalidEndDate = false;
                }
            });
            this.leaveRequestForm.get('endDate').valueChanges.subscribe(function (endDate) {
                var startDate = _this.leaveRequestForm.getRawValue().startDate;
                _this.calculateRequestedDays(startDate, endDate);
                if (_this.requestedDays < 1 && startDate.day)
                    _this.invalidEndDate = true;
                else {
                    _this.invalidEndDate = false;
                    _this.invalidStartDate = false;
                }
            });
            this.isBtnDisabled = false;
            this.requestedDays = 0;
            this.loadAllUsers();
            this.loadAllLeaveTypes();
            if (this.options) {
                this.isBtnDisabled = true;
                this.leaveRequestForm.reset({
                    id: { value: this.options.id, disabled: true },
                    startDate: { value: this.dateToObject(this.options.startDate), disabled: true },
                    endDate: { value: this.dateToObject(this.options.endDate), disabled: true },
                    requestedDays: this.options.requestedDays,
                    leaveType: { value: this.options.leaveType.name, disabled: true },
                    status: { value: this.options.status, disabled: true },
                    requestor: { value: this.options.requestor.firstName + ' ' + this.options.requestor.lastName, disabled: true },
                    approver: { value: this.options.approver.firstName + ' ' + this.options.approver.lastName, disabled: true }
                });
                console.log(this.leaveRequestForm);
            }
        }
    };
    NewLeaveRequestFormComponent.prototype.loadAllLeaveTypes = function () {
        var _this = this;
        this.leaveTypeService.getAllLeaveTypes()
            .subscribe(function (data) {
            _this.leaveTypeList = data;
        }, function (error) {
            console.log(error.name + ' ' + error.error);
        });
    };
    NewLeaveRequestFormComponent.prototype.loadAllUsers = function () {
        var _this = this;
        this.userService.getAllUsers()
            .subscribe(function (data) {
            _this.userList = _this.userMapper.mapList(data, _this.userService);
        }, function (error) {
            console.log(error.name + ' ' + error.message);
        });
    };
    NewLeaveRequestFormComponent.prototype.onChangeUserSelect = function (event) {
        var leaveRequest = this.leaveRequestForm.getRawValue();
        console.log(leaveRequest);
        this.leaveRequestForm.patchValue({ approver: leaveRequest.requestor.manager.firstName + ' ' + leaveRequest.requestor.manager.lastName });
    };
    NewLeaveRequestFormComponent.prototype.onSubmitValidation = function () {
        this.errorMsg = '';
        this.errorMessages = [];
        var isFormValid = true;
        var leaveRequestForm = this.leaveRequestForm.getRawValue();
        if (!leaveRequestForm.startDate || !leaveRequestForm.startDate.day) {
            isFormValid = false;
            this.errorMessages.push('Start Date');
        }
        if (!leaveRequestForm.endDate || !leaveRequestForm.endDate.day) {
            isFormValid = false;
            this.errorMessages.push("End Date");
        }
        if (!leaveRequestForm.leaveType) {
            isFormValid = false;
            this.errorMessages.push("Leave Type");
        }
        if (!leaveRequestForm.requestor) {
            isFormValid = false;
            this.errorMessages.push("Requested For");
        }
        if (this.requestedDays < 1 && leaveRequestForm.startDate.day && leaveRequestForm.endDate.day) {
            isFormValid = false;
            this.invalidEndDate = true;
            this.invalidStartDate = true;
            this.errorMessages.push('Start Date');
            this.errorMessages.push('End Date');
        }
        return isFormValid;
    };
    NewLeaveRequestFormComponent.prototype.onSubmit = function () {
        var _this = this;
        var isFormValid = this.onSubmitValidation();
        if (isFormValid) {
            var leaveRequestDto = this.getLeaveRequestDto(this.leaveRequestForm.getRawValue());
            this.leaveRequestService.addNewLeaveRequest(leaveRequestDto)
                .subscribe(function (data) {
                if (data && data.id)
                    _this.router.navigate(['/leaveRequestList']);
            }, function (error) {
                console.log(error.name + ' ' + error.message);
            });
        }
        else
            this.errorMsg = 'The following fields are mandatory fields and must not be empty: ' + this.errorMessages.join(',');
    };
    NewLeaveRequestFormComponent.prototype.updateLeaveRequest = function (event) {
        var _this = this;
        var buttonId = event.target.id;
        if (buttonId == "approveBtn")
            this.leaveRequestForm.patchValue({ status: 'Approved' });
        else if (buttonId == 'rejectBtn')
            this.leaveRequestForm.patchValue({ status: 'Rejected' });
        this.options.status = this.leaveRequestForm.getRawValue().status;
        var leaveRequestDto = this.getTransformedLeaveRequestDto(this.options);
        this.leaveRequestService.updateLeaveRequest(this.options.id, leaveRequestDto)
            .subscribe(function (data) {
            if (data && data.id) {
                _this.modal.close('Cross Click');
                _this.reloadPage(_this.router);
            }
        }, function (error) {
            console.log(error.name + ' ' + error.message);
        });
    };
    NewLeaveRequestFormComponent.prototype.calculateRequestedDays = function (startDate, endDate) {
        if (startDate && endDate) {
            var date1 = new Date(startDate.year, startDate.month, startDate.day).getTime();
            var date2 = new Date(endDate.year, endDate.month, endDate.day).getTime();
            if (date1 <= date2) {
                var diffTime = Math.abs(date2 - date1);
                var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                this.requestedDays = diffDays;
            }
            else {
                this.requestedDays = 0;
            }
        }
    };
    NewLeaveRequestFormComponent.prototype.getTransformedLeaveRequestDto = function (leaveRequest) {
        var transformedLeaveRequestDto = {};
        transformedLeaveRequestDto.startDate = leaveRequest.startDate;
        transformedLeaveRequestDto.endDate = leaveRequest.endDate;
        transformedLeaveRequestDto.leaveType = this.options.leaveType.id;
        transformedLeaveRequestDto.status = leaveRequest.status;
        transformedLeaveRequestDto.requestedDays = this.requestedDays;
        transformedLeaveRequestDto.requestor = this.options.requestor.id;
        transformedLeaveRequestDto.approver = this.options.requestor.manager;
        return transformedLeaveRequestDto;
    };
    NewLeaveRequestFormComponent.prototype.getLeaveRequestDto = function (leaveRequest) {
        var leaveRequestDto = {};
        leaveRequestDto.startDate = this.dateToString(leaveRequest.startDate);
        leaveRequestDto.endDate = this.dateToString(leaveRequest.endDate);
        leaveRequestDto.leaveType = leaveRequest.leaveType.id;
        leaveRequestDto.status = leaveRequest.status;
        leaveRequestDto.requestedDays = this.requestedDays;
        leaveRequestDto.requestor = leaveRequest.requestor.id;
        leaveRequestDto.approver = leaveRequest.requestor.manager.id;
        return leaveRequestDto;
    };
    NewLeaveRequestFormComponent.prototype.dateToString = function (date) {
        if (date) {
            var year = date.year;
            var month = date.month;
            var day = date.day;
            if (day && month && year)
                return year + '-' + month + '-' + day;
        }
    };
    NewLeaveRequestFormComponent.prototype.dateToObject = function (date) {
        if (date) {
            date = date.split('-');
            return {
                year: Number(date[0]),
                month: Number(date[1]),
                day: Number(date[2])
            };
        }
    };
    NewLeaveRequestFormComponent.prototype.reloadPage = function (router) {
        router.navigateByUrl('/', { skipLocationChange: true })
            .then(function () { return router.navigate(['/leaveRequestList']); });
    };
    __decorate([
        core_1.Input()
    ], NewLeaveRequestFormComponent.prototype, "options");
    __decorate([
        core_1.Input()
    ], NewLeaveRequestFormComponent.prototype, "modal");
    NewLeaveRequestFormComponent = __decorate([
        core_1.Component({
            selector: 'app-new-leave-request-form',
            templateUrl: './new-leave-request-form.component.html',
            styleUrls: ['./new-leave-request-form.component.css']
        })
    ], NewLeaveRequestFormComponent);
    return NewLeaveRequestFormComponent;
}());
exports.NewLeaveRequestFormComponent = NewLeaveRequestFormComponent;
