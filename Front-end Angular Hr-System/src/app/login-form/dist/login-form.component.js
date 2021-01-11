"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var LoginFormComponent = /** @class */ (function () {
    function LoginFormComponent(loginService, router) {
        this.loginService = loginService;
        this.router = router;
        this.loginEvent = new core_1.EventEmitter();
        this.loading = false;
        this.submitted = false;
        if (this.loginService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }
    LoginFormComponent.prototype.ngOnInit = function () {
        this.loginForm = new forms_1.FormGroup({
            username: new forms_1.FormControl('', forms_1.Validators.required),
            password: new forms_1.FormControl('', forms_1.Validators.required)
        });
    };
    LoginFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        var loginForm = this.loginForm.getRawValue();
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.loginService.login(loginForm.username, loginForm.password).pipe(operators_1.first())
            .subscribe(function (data) {
            if (data.valid) {
                _this.router.navigate(['/home']);
            }
            else {
                _this.loading = false;
                _this.submitted = false;
            }
        }, function (error) {
            _this.loading = false;
            _this.submitted = false;
        });
    };
    __decorate([
        core_1.Output()
    ], LoginFormComponent.prototype, "loginEvent");
    LoginFormComponent = __decorate([
        core_1.Component({
            selector: 'app-login-form',
            templateUrl: './login-form.component.html',
            styleUrls: ['./login-form.component.css']
        })
    ], LoginFormComponent);
    return LoginFormComponent;
}());
exports.LoginFormComponent = LoginFormComponent;
