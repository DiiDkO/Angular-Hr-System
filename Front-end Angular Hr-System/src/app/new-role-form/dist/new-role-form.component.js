"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NewRoleFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var NewRoleFormComponent = /** @class */ (function () {
    function NewRoleFormComponent(roleService, loginService, router, confirmDialogService) {
        var _this = this;
        this.roleService = roleService;
        this.loginService = loginService;
        this.router = router;
        this.confirmDialogService = confirmDialogService;
        this.isAdmin = false;
        this.errorMessages = [];
        this.isRoleValid = null;
        this.confirmedResult = false;
        this.roleNameRegex = /^[a-zA-Z_-]{2,50}$/gm;
        this.roleForm = new forms_1.FormGroup({
            id: new forms_1.FormControl({ value: '', disabled: true }),
            name: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(2), forms_1.Validators.maxLength(50)])
        });
        this.loginService.currentUser.subscribe(function (x) { return _this.currentUser = x; });
        this.isAdmin = this.currentUser.roles.includes("admin");
    }
    NewRoleFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.currentUser)
            this.router.navigate(['/login']);
        else {
            this.roleForm.get('name').valueChanges.subscribe(function (name) {
                var regexMatch = name.match(_this.roleNameRegex);
                if (regexMatch != null)
                    _this.isRoleValid = true;
                else
                    _this.isRoleValid = false;
            });
            if (this.options)
                this.roleForm.patchValue({
                    id: this.options.id,
                    name: this.options.name
                });
        }
    };
    NewRoleFormComponent.prototype.updateRole = function () {
        var _this = this;
        var isFormValid = this.onSubmitValidation();
        if (isFormValid) {
            this.roleService.updateRole(this.roleForm.getRawValue())
                .subscribe(function (data) {
                if (data) {
                    _this.modal.close('Cross Click');
                    _this.reloadPage(_this.router);
                }
            }, function (error) {
                console.log(error.name + ' ' + error.message);
            });
        }
        else
            this.errorMsg = 'The following fields are mandatory fields and must contain valid data: ' + this.errorMessages.join(',');
    };
    NewRoleFormComponent.prototype.deleteRole = function () {
        var _this = this;
        this.confirmDialogService.confirm('Confirmation', 'Do you really want to delete it ?')
            .then(function (confirmed) {
            if (confirmed)
                _this._deleteRole();
        })["catch"](function () { return false; });
    };
    NewRoleFormComponent.prototype._deleteRole = function () {
        var _this = this;
        this.roleService.deleteRole(this.roleForm.getRawValue().id)
            .subscribe(function (data) {
            if (!data) {
                _this.modal.close('Cross Click');
                _this.reloadPage(_this.router);
            }
        }, function (error) {
            console.log(error.name + ' ' + error.message);
        });
    };
    NewRoleFormComponent.prototype.onSubmit = function () {
        var _this = this;
        var isFormValid = this.onSubmitValidation();
        if (isFormValid) {
            this.roleService.addNewRole(this.roleForm.getRawValue())
                .subscribe(function (data) {
                if (data.id)
                    _this.router.navigate(['/roleList']);
            }, function (error) {
                console.log(error.name + ' ' + error.message);
            });
        }
        else
            this.errorMsg = 'The following fields are mandatory fields and must contain valid data: ' + this.errorMessages.join(',');
    };
    NewRoleFormComponent.prototype.onSubmitValidation = function () {
        this.errorMsg = '';
        this.errorMessages = [];
        var isFormValid = true;
        var roleForm = this.roleForm.getRawValue();
        var nameRegexCheck = roleForm.name.match(this.roleNameRegex);
        if (!roleForm.name || (!nameRegexCheck) || roleForm.name.length > 50 || roleForm.name.length < 2) {
            isFormValid = false;
            this.errorMessages.push('Role');
        }
        return isFormValid;
    };
    NewRoleFormComponent.prototype.reloadPage = function (router) {
        router.navigateByUrl('/', { skipLocationChange: true })
            .then(function () { return router.navigate(['/roleList']); });
    };
    __decorate([
        core_1.Input()
    ], NewRoleFormComponent.prototype, "options");
    __decorate([
        core_1.Input()
    ], NewRoleFormComponent.prototype, "modal");
    NewRoleFormComponent = __decorate([
        core_1.Component({
            selector: 'app-new-role-form',
            templateUrl: './new-role-form.component.html',
            styleUrls: ['./new-role-form.component.css']
        })
    ], NewRoleFormComponent);
    return NewRoleFormComponent;
}());
exports.NewRoleFormComponent = NewRoleFormComponent;
