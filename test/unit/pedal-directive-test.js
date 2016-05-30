const angular = require('angular');
require('angular-mocks');
const pedalForm = require('../../app/templates/pedals/directives/pedal-form.html');
const pedalListItem = require('../../app/templates/pedals/directives/pedal-list-item.html');

describe('pedal directive', function() { //  eslint-disable-line prefer-arrow-callback
  beforeEach(angular.mock.module('bikeApp'));

  var $httpBackend;
  var $compile;
  var $scope;

//  eslint-disable-next-line prefer-arrow-callback
  beforeEach(angular.mock.inject(function(_$compile_, $rootScope, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $compile = _$compile_;
    $scope = $rootScope.$new();
  }));


  it('should create a pedal form', function() { //  eslint-disable-line prefer-arrow-callback
    $httpBackend.expectGET('templates/pedals/directives/pedal-form.html')
      .respond(200, pedalForm);

    var form = $compile('<section data-ng-controller="PedalController as pedalctrl"><pedal-form data-button-text="Make Pedalbike"></pedal-form></section>'); // eslint-disable-line max-len
    var directive = form($scope);
    $httpBackend.flush();
    var button = directive.find('button');
    expect(button.text()).toEqual('Make Pedalbike');
  });

  it('should create a pedal list', function() { //  eslint-disable-line prefer-arrow-callback
    $httpBackend.expectGET('/templates/pedals/directives/pedal-list-item.html')
      .respond(200, pedalListItem);

    $scope.pedal = {
      model: 'Merckx EM525',
      gears: 20,
      frameType: 'Carbon',
      maxSpeed: 40
    };

    var list = $compile('<section data-ng-controller="PedalController as pedalctrl"><pedal-list-item data-pedal="pedal"></pedal-list-item></section>'); // eslint-disable-line max-len
    var directive = list($scope);
    $httpBackend.flush();
    var span = directive.find('span');
    expect(span.text()).toEqual('The Merckx EM525 has: 20 gears, Carbon frame and a max speed of 40 MPH'); // eslint-disable-line max-len
  });
});
