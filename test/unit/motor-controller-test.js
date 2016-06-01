require('angular');
require('angular-mocks');

describe('Motor Controller Testing', function() { // eslint-disable-line prefer-arrow-callback
    var $httpBackend;
    var $controller;
    var motorctrl;
    var testUrl = 'http://localhost:5000/api/motor';

    beforeEach(function() {  // eslint-disable-line prefer-arrow-callback
      angular.mock.module('bikeApp');
      angular.mock.inject(function(_$controller_) {  // eslint-disable-line prefer-arrow-callback
        $controller = _$controller_;
      });
      angular.mock.inject(function(_$httpBackend_) {  // eslint-disable-line prefer-arrow-callback
        $httpBackend = _$httpBackend_;
        motorctrl = $controller('MotorController');
      });
    });
    afterEach(function() { // eslint-disable-line prefer-arrow-callback
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should use GET to retrieve motor bikes', function() {  // eslint-disable-line prefer-arrow-callback, max-len
      $httpBackend.expectGET(testUrl)
        .respond(200, [{ model: 'Ducati' }]);
      motorctrl.getAll();
      $httpBackend.flush();
      expect(motorctrl.motors.length).toBe(1);
      expect(motorctrl.motors[0].model).toBe('Ducati');
    });

    it('should use POST to make a bike', function() {  // eslint-disable-line prefer-arrow-callback
      $httpBackend.expectPOST(testUrl, { model: 'Ducati', displacement: 900 })
        .respond(200, [{ model: 'testBike', displacement: 768 }]);
      motorctrl.newMotor = { model: 'Ducati', displacement: 900 };
      motorctrl.createMotor();
      $httpBackend.flush();
      expect(motorctrl.newMotor).toBe(null);
      expect(motorctrl.motors[0][0].model).toBe('testBike');
    });

    it('should use PUT to update a bike', function() {  // eslint-disable-line prefer-arrow-callback
      $httpBackend.expectPUT(testUrl + '/Ducati',
      { model: 'Ducati', displacement: 768, editing: 'true' })
        .respond(200);
      motorctrl.motors = [{ model: 'Ducati', displacement: 900, editing: 'true' }];
      motorctrl.motors[0].displacement = 768;
      motorctrl.updateMotor(motorctrl.motors[0]);
      $httpBackend.flush();
      expect(motorctrl.motors[0].editing).toBe(false);
    });

    it('should use DELETE to remove a bike', function() { // eslint-disable-line prefer-arrow-callback, max-len
      $httpBackend.expectDELETE(testUrl + '/Ducati').respond(200);
      motorctrl.motors = [{ model: 'Ducati', displacement: 768 }];
      motorctrl.removeMotor(motorctrl.motors[0]);
      $httpBackend.flush();
      expect(motorctrl.motors.length).toBe(0);
    });
});
