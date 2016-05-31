module.exports = function(app) {
  app.factory('gmCounter', function() { // eslint-disable-line prefer-arrow-callback
    return {
      pedalBikes: [],
      motorBikes: [],
      addPedal: function(newBike) {
        this.pedalBikes.push(newBike);
      },
      addMotor: function(newMotor) {
        this.motorBikes.push(newMotor);
      },
      checkTotal: function() {
        return this.pedalBikes.length + this.motorBikes.length;
      }
    };
  });
};
