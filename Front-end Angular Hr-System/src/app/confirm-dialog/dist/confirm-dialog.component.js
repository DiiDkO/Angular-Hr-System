"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConfirmDialogComponent = void 0;
var core_1 = require("@angular/core");
var ConfirmDialogComponent = /** @class */ (function () {
    function ConfirmDialogComponent(activeModal) {
        this.activeModal = activeModal;
    }
    ConfirmDialogComponent.prototype.ngOnInit = function () {
    };
    ConfirmDialogComponent.prototype.decline = function () {
        this.activeModal.close(false);
    };
    ConfirmDialogComponent.prototype.accept = function () {
        this.activeModal.close(true);
    };
    ConfirmDialogComponent.prototype.dismiss = function () {
        this.activeModal.dismiss();
    };
    __decorate([
        core_1.Input()
    ], ConfirmDialogComponent.prototype, "title");
    __decorate([
        core_1.Input()
    ], ConfirmDialogComponent.prototype, "message");
    __decorate([
        core_1.Input()
    ], ConfirmDialogComponent.prototype, "btnOkText");
    __decorate([
        core_1.Input()
    ], ConfirmDialogComponent.prototype, "btnCancelText");
    ConfirmDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-confirm-dialog',
            templateUrl: './confirm-dialog.component.html',
            styleUrls: ['./confirm-dialog.component.css']
        })
    ], ConfirmDialogComponent);
    return ConfirmDialogComponent;
}());
exports.ConfirmDialogComponent = ConfirmDialogComponent;
