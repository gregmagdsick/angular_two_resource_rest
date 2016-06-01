require('angular');
require('angular-mocks');

describe('Pedal Controller Testing', function() { // eslint-disable-line prefer-arrow-callback
  var $httpBackend;
  var $controller;
  var pedalctrl;
  var testUrl = 'http://localhost:5000/api/pedal';

  beforeEach(function() { // eslint-disable-line prefer-arrow-callback
    angular.mock.module('bikeApp');
    angular.mock.inject(function(_$controller_) { // eslint-disable-line prefer-arrow-callback
      $controller = _$controller_;
    });
    angular.mock.inject(function(_$httpBackend_) { // eslint-disable-line prefer-arrow-callback
      $httpBackend = _$httpBackend_;
      pedalctrl = $controller('PedalController');
    });
  });
  afterEach(function() { // eslint-disable-line prefer-arrow-callback
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should use GET to retrieve pedal bikes', function() { // eslint-disable-line prefer-arrow-callback, max-len
    $httpBackend.expectGET(testUrl)
      .respond(200, [{ model: 'Masi' }]);
    pedalctrl.getAll();
    $httpBackend.flush();
    expect(pedalctrl.pedals.length).toBe(1);
    expect(pedalctrl.pedals[0].model).toBe('Masi');
  });

  it('should use POST to make a bike', function() { // eslint-disable-line prefer-arrow-callback
    $httpBackend.expectPOST(testUrl, { model: 'Masi', frame: 'italian steel' })
      .respond(200, [{ model: 'testModel', frame: 'rolled steel' }]);
    pedalctrl.newPedal = { model: 'Masi', frame: 'italian steel' };
    pedalctrl.createPedal();
    $httpBackend.flush();
    expect(pedalctrl.newPedal).toBe(null);
    expect(pedalctrl.pedals[0][0].model).toBe('testModel');
  });

  it('should use PUT to update a bike', function() { // eslint-disable-line prefer-arrow-callback
    $httpBackend.expectPUT(testUrl + '/Masi',
    { model: 'Masi', frame: 'rolled steel', editing: 'true' })
      .respond(200);
    pedalctrl.pedals = [{ model: 'Masi', frame: 'italian steel', editing: 'true' }];
    pedalctrl.pedals[0].frame = 'rolled steel';
    pedalctrl.updatePedal(pedalctrl.pedals[0]);
    $httpBackend.flush();
    expect(pedalctrl.pedals[0].editing).toBe(false);
  });

  it('should use DELETE to remove a bike', function() { // eslint-disable-line prefer-arrow-callback
    $httpBackend.expectDELETE(testUrl + '/Masi').respond(200);
    pedalctrl.pedals = [{ model: 'Masi', frame: 'italian steel', editing: 'true' }];
    pedalctrl.removePedal(pedalctrl.pedals[0]);
    $httpBackend.flush();
    expect(pedalctrl.pedals.length).toBe(0);
  });
});
