"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var shared_service_1 = require("./shared.service");
describe('SharedServiceService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(shared_service_1.SharedService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
