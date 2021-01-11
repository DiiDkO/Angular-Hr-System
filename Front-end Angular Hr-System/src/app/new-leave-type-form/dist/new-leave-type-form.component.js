"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NewLeaveTypeFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var NewLeaveTypeFormComponent = /** @class */ (function () {
    function NewLeaveTypeFormComponent(leaveTypeService, loginService, router, confirmDialogService) {
        var _this = this;
        this.leaveTypeService = leaveTypeService;
        this.loginService = loginService;
        this.router = router;
        this.confirmDialogService = confirmDialogService;
        this.isAdmin = false;
        this.errorMessages = [];
        this.isLeaveTypeValid = null;
        this.leaveTypeRegex = /^[a-zA-Z\s_-]{2,80}$/gm;
        this.leaveTypeForm = new forms_1.FormGroup({
            id: new forms_1.FormControl({ value: '', disabled: true }),
            name: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(2), forms_1.Validators.maxLength(80)])
        });
        this.loginService.currentUser.subscribe(function (x) { return _this.currentUser = x; });
        this.isAdmin = this.currentUser.roles.includes("admin");
    }
    NewLeaveTypeFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.currentUser)
            this.router.navigate(['/login']);
        else {
            this.leaveTypeForm.get('name').valueChanges.subscribe(function (name) {
                var regexMatch = name.match(_this.leaveTypeRegex);
                if (regexMatch != null)
                    _this.isLeaveTypeValid = true;
                else
                    _this.isLeaveTypeValid = false;
            });
            if (this.options)
                this.leaveTypeForm.patchValue({
                    id: this.options.id,
                    name: this.options.name
                });
        }
    };
    NewLeaveTypeFormComponent.prototype.onSubmit = function () {
        var _this = this;
        var isFormValid = this.onSubmitValidation();
        if (isFormValid) {
            this.leaveTypeService.addNewLeaveType(this.leaveTypeForm.getRawValue())
                .subscribe(function (data) {
                _this.newLeaveType = data;
                if (_this.newLeaveType.id)
                    _this.router.navigate(['/leaveTypeList']);
            }, function (error) {
                console.log(error.name + ' ' + error.message);
            });
        }
        else
            this.errorMsg = 'The following fields are mandatory fields and must contain valid data: ' + this.errorMessages.join(',');
    };
    NewLeaveTypeFormComponent.prototype.onSubmitValidation = function () {
        this.errorMsg = '';
        this.errorMessages = [];
        var isFormValid = true;
        var leaveTypeForm = this.leaveTypeForm.getRawValue();
        var nameRegexCheck = leaveTypeForm.name.match(this.leaveTypeRegex);
        if (!leaveTypeForm.name || (!nameRegexCheck) || leaveTypeForm.name.length > 80 || leaveTypeForm.name.length < 2) {
            isFormValid = false;
            this.errorMessages.push('Leave Type');
        }
        return isFormValid;
    };
    NewLeaveTypeFormComponent.prototype.updateLeaveType = function () {
        var _this = this;
        var isFormValid = this.onSubmitValidation();
        if (isFormValid) {
            this.leaveTypeService.updateLeaveType(this.leaveTypeForm.getRawValue())
                .subscribe(function (data) {
                if (data) {
                    _this.modal.close('Cross Click');
                    _this.leaveTypeService.reloadPage(_this.router);
                }
            }, function (error) {
                console.log(error.name + ' ' + error.message);
            });
        }
        else
            this.errorMsg = 'The following fields are mandatory fields and must contain valid data: ' + this.errorMessages.join(',');
    };
    NewLeaveTypeFormComponent.prototype.deleteLeaveType = function () {
        var _this = this;
        this.confirmDialogService.confirm('Confirmation', 'Do you really want to delete it ?')
            .then(function (confirmed) {
            if (confirmed)
                _this._deleteLeaveType();
        })["catch"](function () { return false; });
    };
    NewLeaveTypeFormComponent.prototype._deleteLeaveType = function () {
        var _this = this;
        this.leaveTypeService.deleteLeaveType(this.leaveTypeForm.getRawValue().id)
            .subscribe(function (data) {
            if (!data) {
                _this.modal.close('Cross Click');
                _this.leaveTypeService.reloadPage(_this.router);
            }
        }, function (error) {
            console.log(error.name + ' ' + error.message);
        });
    };
    __decorate([
        core_1.Input()
    ], NewLeaveTypeFormComponent.prototype, "options");
    __decorate([
        core_1.Input()
    ], NewLeaveTypeFormComponent.prototype, "modal");
    NewLeaveTypeFormComponent = __decorate([
        core_1.Component({
            selector: 'app-new-leave-type-form',
            templateUrl: './new-leave-type-form.component.html',
            styleUrls: ['./new-leave-type-form.component.css']
        })
    ], NewLeaveTypeFormComponent);
    return NewLeaveTypeFormComponent;
}());
exports.NewLeaveTypeFormComponent = NewLeaveTypeFormComponent;
