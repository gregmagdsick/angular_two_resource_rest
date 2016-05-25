var angular = require('angular');

describe('gmHandleError service test', function() {
  var gmHandleError;
  beforeEach(angular.mock.module('bikeApp'));

  it('should return a function', angular.mock.inject(function(gmHandleError) {
    expect(typeof gmHandleError).toBe('function');
  }));

  it('should posh an error to the errors array', angular.mock.inject(function(gmHandleError) {
    var testArr = [];
    gmHandleError(testArr, '418: I am a teapot')();
    expect(testArr.length).toBe(1);
    expect(testArr[0].message).toBe('418: I am a teapot1');
  }));
});
