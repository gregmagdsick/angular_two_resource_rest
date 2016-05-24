const angular = require('angular');
require('angular-mocks');
const pedalForm = require('../../app/templates/pedals/directives/pedal-form.html');
const pedalListItem = require('../../app/templates/pedals/directives/pedal-list-item.html');

describe('pedal directive', function() {
  beforeEach(angular.mock.module('bikeApp'));

  var $httpBackend;
  var $compile;
  var $scope;

  beforeEach(angular.mock.inject(function(_$compile_, $rootScope, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $compile = _$compile_;
    $scope = $rootScope.$new();
  }));

  it('should create a pedal form', function() {
    $httpBackend.expectGET('/templates/pedals/directives/pedal-form.html')
      .respond(200, pedalForm);

    var form = $compile('<section data-ng-controller="PedalController as pedalctrl"><pedal-form data-button-text="Make Pedalbike"></pedal-form></section>'); // eslint-disable-line max-len
    var directive = form($scope);
    $httpBackend.flush();
    var button = directive.find('button');
    expect(button.text()).toEqual('Make ns Pedalbike');
  });
});
