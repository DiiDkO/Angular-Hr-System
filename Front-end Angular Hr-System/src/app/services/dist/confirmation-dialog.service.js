"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConfirmationDialogService = void 0;
var core_1 = require("@angular/core");
var confirmaton_dialog_component_1 = require("../confirmaton-dialog/confirmaton-dialog.component");
var ConfirmationDialogService = /** @class */ (function () {
    function ConfirmationDialogService(modalService) {
        this.modalService = modalService;
    }
    ConfirmationDialogService.prototype.confirm = function (title, message, dialogSize) {
        if (dialogSize === void 0) { dialogSize = 'sm'; }
        var modalRef = this.modalService.open(confirmaton_dialog_component_1.ConfirmatonDialogComponent, { size: dialogSize });
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.message = message;
        return modalRef.result;
    };
    ConfirmationDialogService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ConfirmationDialogService);
    return ConfirmationDialogService;
}());
exports.ConfirmationDialogService = ConfirmationDialogService;
