require('angular');

describe('counter service test', function() { // eslint-disable-line prefer-arrow-callback
  beforeEach(angular.mock.module('bikeApp'));

  it('should increase totalBikesCount when adding a pedalBike', angular.mock.inject(function(gmCounter) { // eslint-disable-line prefer-arrow-callback, max-len
    var testBike = { model: 'schwinn', gears: 10, frameType: 'Steel', maxSpeed: 28 };
    gmCounter.addPedal(testBike);
    expect(gmCounter.checkTotal()).toBe(1);
  }));

  it('should increase totalBikesCount when adding a motorBike', angular.mock.inject(function(gmCounter) { // eslint-disable-line prefer-arrow-callback, max-len
    var testBike = { model: 'Kawasaki', displacement: 650, cylinders: 3, maxSpeed: 178 };
    gmCounter.addMotor(testBike);
    expect(gmCounter.checkTotal()).toBe(1);
  }));
});
