"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginService = void 0;
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/internal/BehaviorSubject");
var operators_1 = require("rxjs/operators");
var LoginService = /** @class */ (function () {
    function LoginService(httpService) {
        this.httpService = httpService;
        this.url = "http://localhost:8080/login";
        this.currentUserSubject = new BehaviorSubject_1.BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    Object.defineProperty(LoginService.prototype, "currentUserValue", {
        get: function () {
            return this.currentUserSubject.getValue();
        },
        enumerable: false,
        configurable: true
    });
    LoginService.prototype.login = function (username, password) {
        var _this = this;
        return this.httpService.post(this.url, { username: username, password: password })
            .pipe(operators_1.map(function (data) {
            var loginUser = { id: data.id, username: data.username, password: data.password, roles: data.roles, valid: data.valid };
            localStorage.setItem('currentUser', JSON.stringify(loginUser));
            _this.currentUserSubject.next(loginUser);
            return loginUser;
        }));
    };
    LoginService.prototype.logout = function () {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    };
    LoginService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
