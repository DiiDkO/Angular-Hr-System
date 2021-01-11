"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NewUserFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var NewUserFormComponent = /** @class */ (function () {
    function NewUserFormComponent(userService, loginService, router, confirmDialogService) {
        var _this = this;
        this.userService = userService;
        this.loginService = loginService;
        this.router = router;
        this.confirmDialogService = confirmDialogService;
        this.isAdmin = false;
        this.isPasswordMatched = null;
        this.errorMessages = [];
        this.usernameRegex = /[a-zA-Z0-9]{6,30}/gm;
        this.passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/gm;
        this.emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/gm;
        this.userForm = new forms_1.FormGroup({
            id: new forms_1.FormControl({ value: '', disabled: true }),
            username: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern(this.usernameRegex), forms_1.Validators.minLength(6), forms_1.Validators.maxLength(30)]),
            firstName: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.maxLength(30), forms_1.Validators.minLength(2)]),
            middleName: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.maxLength(30), forms_1.Validators.minLength(2)]),
            lastName: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.maxLength(30), forms_1.Validators.minLength(2)]),
            email: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.email, forms_1.Validators.pattern(this.emailRegex)]),
            manager: new forms_1.FormControl(null),
            groups: new forms_1.FormControl([]),
            password: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern(this.passwordRegex), forms_1.Validators.maxLength(50)]),
            confirmPassword: new forms_1.FormControl(''),
            active: new forms_1.FormControl({ value: true, disabled: true })
        });
        this.loginService.currentUser.subscribe(function (x) { return _this.currentUser = x; });
        this.isAdmin = this.currentUser.roles.includes("admin");
    }
    NewUserFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.currentUser)
            this.router.navigate(['/login']);
        else {
            this.userForm.get('password').valueChanges.subscribe(function (password) {
                var confirmPassword = _this.userForm.getRawValue().confirmPassword;
                if (password && confirmPassword)
                    _this.isPasswordMatched = _this.comparePasswords(password, confirmPassword);
                else
                    _this.isPasswordMatched = null;
            });
            this.userForm.get('confirmPassword').valueChanges.subscribe(function (confirmPassword) {
                var password = _this.userForm.getRawValue().password;
                if (password && confirmPassword)
                    _this.isPasswordMatched = _this.comparePasswords(password, confirmPassword);
                else
                    _this.isPasswordMatched = null;
            });
            this.loadAllManagers();
            if (this.options)
                this.userForm.patchValue({
                    id: this.options.id,
                    username: this.options.username,
                    firstName: this.options.firstName,
                    middleName: this.options.middleName,
                    lastName: this.options.lastName,
                    email: this.options.email,
                    manager: this.options.manager,
                    groups: this.options.groups,
                    password: this.currentUser.password,
                    active: this.options.active
                });
        }
    };
    NewUserFormComponent.prototype.loadAllManagers = function () {
        var _this = this;
        this.userService.getAllUsers()
            .subscribe(function (data) {
            _this.managerList = data;
        }, function (error) {
            console.log(error.name + ' ' + error.message);
        });
    };
    NewUserFormComponent.prototype.onSubmitValidation = function () {
        this.errorMsg = '';
        this.errorMessages = [];
        var isFormValid = true;
        var userForm = this.userForm.getRawValue();
        var usernameRegexCheck = userForm.username.match(this.usernameRegex);
        var passwordRegexCheck = userForm.password.match(this.passwordRegex);
        var emailRegexCheck = userForm.email.match(this.emailRegex);
        if (!userForm.username || (!usernameRegexCheck) || userForm.username.length > 30 || userForm.username.length < 6) {
            isFormValid = false;
            this.errorMessages.push('Username');
        }
        if (!userForm.firstName || userForm.firstName.length > 30 || userForm.firstName.length < 2) {
            isFormValid = false;
            this.errorMessages.push("First Name");
        }
        if (!userForm.middleName || userForm.middleName.length > 30 || userForm.middleName.length < 2) {
            isFormValid = false;
            this.errorMessages.push("Middle Name");
        }
        if (!userForm.lastName || userForm.lastName.length > 30 || userForm.lastName.length < 2) {
            isFormValid = false;
            this.errorMessages.push("Last Name");
        }
        if (!userForm.email || (!emailRegexCheck)) {
            console.log('Test');
            isFormValid = false;
            this.errorMessages.push("Email");
        }
        if (!userForm.password || (!passwordRegexCheck)) {
            isFormValid = false;
            this.errorMessages.push("Password");
        }
        if (!userForm.confirmPassword || !this.isPasswordMatched) {
            isFormValid = false;
            this.errorMessages.push("Confirm Password");
        }
        return isFormValid;
    };
    NewUserFormComponent.prototype.onSubmit = function () {
        var _this = this;
        var isFormValid = this.onSubmitValidation();
        if (isFormValid) {
            this.errorMessages = [];
            this.errorMsg = '';
            this.userService.addNewUser(this.userForm.getRawValue())
                .subscribe(function (data) {
                if (data)
                    _this.router.navigate(['/userList']);
            }, function (error) {
                console.log(error.name + ' ' + error.message);
            });
        }
        else
            this.errorMsg = 'The following fields are mandatory fields and must contain valid data: ' + this.errorMessages.join(',');
    };
    NewUserFormComponent.prototype.updateUser = function () {
        var _this = this;
        var isFormValid = this.onSubmitValidation();
        if (isFormValid) {
            this.userService.updateUser(this.userForm.getRawValue())
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
    NewUserFormComponent.prototype.deleteUser = function () {
        var _this = this;
        this.confirmDialogService.confirm('Confirmation', 'Do you really want to delete it ?')
            .then(function (confirmed) {
            if (confirmed)
                _this._deleteUser();
        })["catch"](function () { return false; });
    };
    NewUserFormComponent.prototype._deleteUser = function () {
        var _this = this;
        this.userService.deleteUser(this.userForm.getRawValue().id)
            .subscribe(function (data) {
            if (!data) {
                _this.modal.close('Cross Click');
                _this.reloadPage(_this.router);
            }
        }, function (error) {
            console.log(error.name + ' ' + error.message);
        });
    };
    NewUserFormComponent.prototype.comparePasswords = function (password, confirmPassword) {
        return (password === confirmPassword);
    };
    NewUserFormComponent.prototype.reloadPage = function (router) {
        router.navigateByUrl('/', { skipLocationChange: true })
            .then(function () { return router.navigate(['/userList']); });
    };
    __decorate([
        core_1.Input()
    ], NewUserFormComponent.prototype, "options");
    __decorate([
        core_1.Input()
    ], NewUserFormComponent.prototype, "modal");
    NewUserFormComponent = __decorate([
        core_1.Component({
            selector: 'app-new-user-form',
            templateUrl: './new-user-form.component.html',
            styleUrls: ['./new-user-form.component.css']
        })
    ], NewUserFormComponent);
    return NewUserFormComponent;
}());
exports.NewUserFormComponent = NewUserFormComponent;
