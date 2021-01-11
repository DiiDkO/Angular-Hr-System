"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ModalBasicComponent = void 0;
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ModalBasicComponent = /** @class */ (function () {
    function ModalBasicComponent(modalService, roleService) {
        this.modalService = modalService;
        this.roleService = roleService;
        this.closeResult = '';
    }
    ModalBasicComponent.prototype.open = function (content) {
        var _this = this;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: this.modalSize }).result.then(function (result) {
        }, function (reason) {
            _this.getDismissReason(reason);
        });
    };
    ModalBasicComponent.prototype.getDismissReason = function (reason) {
        if (reason === ng_bootstrap_1.ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ng_bootstrap_1.ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    ModalBasicComponent.prototype.ngOnInit = function () {
        if (this.label == "Role" || this.label == "Group" || this.label == 'Leave Type')
            this.modalSize = 'md';
        else
            this.modalSize = 'xl';
    };
    __decorate([
        core_1.Input()
    ], ModalBasicComponent.prototype, "options");
    __decorate([
        core_1.Input()
    ], ModalBasicComponent.prototype, "label");
    ModalBasicComponent = __decorate([
        core_1.Component({
            selector: 'app-modal-basic',
            templateUrl: './modal-basic.component.html',
            styleUrls: ['./modal-basic.component.css']
        })
    ], ModalBasicComponent);
    return ModalBasicComponent;
}());
exports.ModalBasicComponent = ModalBasicComponent;
