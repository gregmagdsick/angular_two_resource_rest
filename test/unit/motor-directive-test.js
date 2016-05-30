require('angular-mocks');
const motorForm = require('../../app/templates/motors/directives/motor-form.html');
const motorListItem = require('../../app/templates/motors/directives/motor-list-item.html');

describe('motor directive', function() { // eslint-disable-line prefer-arrow-callback
  beforeEach(angular.mock.module('bikeApp'));

  var $httpBackend;
  var $compile;
  var $scope;
// eslint-disable-next-line prefer-arrow-callback
  beforeEach(angular.mock.inject(function(_$compile_, $rootScope, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $compile = _$compile_;
    $scope = $rootScope.$new();
  }));

  it('should create a motor form', function() { // eslint-disable-line prefer-arrow-callback
    $httpBackend.expectGET('templates/motors/directives/motor-form.html')
      .respond(200, motorForm);

    var form = $compile('<section data-ng-controller="MotorController as motorctrl"><motor-form data-button-text="Make Motorbike"></motor-form></section>'); // eslint-disable-line max-len
    var directive = form($scope);
    $httpBackend.flush();
    var button = directive.find('button');
    expect(button.text()).toEqual('Make Motorbike');
  });

  it('should create a motor list', function() { // eslint-disable-line prefer-arrow-callback
    $httpBackend.expectGET('/templates/motors/directives/motor-list-item.html')
      .respond(200, motorListItem);

    $scope.motor = {
      model: '1920 Indian Scout',
      displacement: 950,
      cylinders: 2,
      maxSpeed: 190.07
    };

    var list = $compile('<section data-ng-controller="MotorController as motorctrl"><motor-list-item data-motor="motor"></motor-list-item></section>'); // eslint-disable-line max-len
    var directive = list($scope);
    $httpBackend.flush();
    var span = directive.find('span');
    expect(span.text()).toEqual('The 1920 Indian Scout has: a displacement of 950 CCs, 2 cylinders, and a top speed of 190.07 MPH'); // eslint-disable-line max-len
  });
});
