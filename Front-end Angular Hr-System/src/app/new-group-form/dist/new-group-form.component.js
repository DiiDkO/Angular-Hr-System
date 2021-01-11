"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NewGroupFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var NewGroupFormComponent = /** @class */ (function () {
    function NewGroupFormComponent(userService, groupService, loginService, router, confirmDialogService) {
        var _this = this;
        this.userService = userService;
        this.groupService = groupService;
        this.loginService = loginService;
        this.router = router;
        this.confirmDialogService = confirmDialogService;
        this.isAdmin = false;
        this.errorMessages = [];
        this.isGroupValid = null;
        this.groupRegex = /^[a-zA-Z0-9\s_-]{2,80}$/gm;
        this.emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/gm;
        this.groupForm = new forms_1.FormGroup({
            id: new forms_1.FormControl({ value: '', disabled: true }),
            name: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(2), forms_1.Validators.maxLength(80)]),
            email: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.email, forms_1.Validators.pattern(this.emailRegex)]),
            manager: new forms_1.FormControl(''),
            roles: new forms_1.FormControl([]),
            members: new forms_1.FormControl([])
        });
        this.loginService.currentUser.subscribe(function (x) { return _this.currentUser = x; });
        this.isAdmin = this.currentUser.roles.includes("admin");
    }
    NewGroupFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.currentUser)
            this.router.navigate(['/login']);
        else {
            this.loadAllManagers();
            this.groupForm.get('name').valueChanges.subscribe(function (name) {
                var regexMatch = name.match(_this.groupRegex);
                if (regexMatch != null)
                    _this.isGroupValid = true;
                else
                    _this.isGroupValid = false;
            });
            if (this.options)
                this.groupForm.patchValue({
                    id: this.options.id,
                    name: this.options.name,
                    email: this.options.email,
                    manager: this.options.manager,
                    roles: this.options.roles,
                    members: this.options.users
                });
        }
    };
    NewGroupFormComponent.prototype.loadAllManagers = function () {
        var _this = this;
        this.userService.getAllUsers()
            .subscribe(function (data) {
            _this.managerList = data;
        }, function (error) {
            console.log(error.name + ' ' + error.message);
        });
    };
    NewGroupFormComponent.prototype.onSubmitValidation = function () {
        this.errorMsg = '';
        this.errorMessages = [];
        var isFormValid = true;
        var groupForm = this.groupForm.getRawValue();
        var nameRegexCheck = groupForm.name.match(this.groupRegex);
        var emailRegexCheck = groupForm.email.match(this.emailRegex);
        if (!groupForm.name || (!nameRegexCheck || !nameRegexCheck[0]) || groupForm.name.length > 80 || groupForm.name.length < 2) {
            isFormValid = false;
            this.errorMessages.push('Group');
        }
        if (!groupForm.email || (!emailRegexCheck)) {
            isFormValid = false;
            this.errorMessages.push('Email');
        }
        return isFormValid;
    };
    NewGroupFormComponent.prototype.onSubmit = function () {
        var _this = this;
        var isFormValid = this.onSubmitValidation();
        if (isFormValid) {
            this.groupForm.patchValue({ id: this.groupId });
            this.groupService.addNewGroup(this.groupForm.getRawValue())
                .subscribe(function (data) {
                if (data && data.id)
                    _this.router.navigate(['/groupList']);
            }, function (error) {
                console.log(error.name + ' ' + error.message);
            });
        }
        else
            this.errorMsg = 'The following fields are mandatory fields and must contain valid data: ' + this.errorMessages.join(',');
    };
    NewGroupFormComponent.prototype.updateGroup = function () {
        var _this = this;
        var isFormValid = this.onSubmitValidation();
        if (isFormValid) {
            this.groupService.updateGroup(this.groupForm.getRawValue())
                .subscribe(function (data) {
                if (data && data.id) {
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
    NewGroupFormComponent.prototype.deleteGroup = function () {
        var _this = this;
        this.confirmDialogService.confirm('Confirmation', 'Do you really want to delete it ?')
            .then(function (confirmed) {
            if (confirmed)
                _this._deleteGroup();
        })["catch"](function () { return false; });
    };
    NewGroupFormComponent.prototype._deleteGroup = function () {
        var _this = this;
        this.groupService.deleteGroup(this.groupForm.getRawValue().id)
            .subscribe(function (data) {
            if (!data) {
                _this.modal.close('Cross Click');
                _this.reloadPage(_this.router);
            }
        }, function (error) {
            console.log(error.name + ' ' + error.message);
        });
    };
    NewGroupFormComponent.prototype.reloadPage = function (router) {
        router.navigateByUrl('/', { skipLocationChange: true })
            .then(function () { return router.navigate(['/groupList']); });
    };
    __decorate([
        core_1.Input()
    ], NewGroupFormComponent.prototype, "options");
    __decorate([
        core_1.Input()
    ], NewGroupFormComponent.prototype, "modal");
    NewGroupFormComponent = __decorate([
        core_1.Component({
            selector: 'app-new-group-form',
            templateUrl: './new-group-form.component.html',
            styleUrls: ['./new-group-form.component.css']
        })
    ], NewGroupFormComponent);
    return NewGroupFormComponent;
}());
exports.NewGroupFormComponent = NewGroupFormComponent;
