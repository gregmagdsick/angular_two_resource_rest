const baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('MotorController', ['$http', 'gmHandleError', 'gmCounter', function($http, gmHandleError, gmCounter) { // eslint-disable-line max-len
    this.gmCounter = gmCounter;
    this.motors = this.gmCounter.motorBikes;
    this.getAll = () => {
      $http.get(baseUrl + '/api/motor')
      .then((res) => {
        this.motors = this.gmCounter.motorBikes = res.data;
      }, gmHandleError(this.errors, 'Could not get motorbikes from server').bind(this));
    };

    this.createMotor = () => {
      $http.post(baseUrl + '/api/motor', this.newMotor)
      .then((res) => {
        this.newMotor = null;
        this.motors.push(res.data);
        this.gmCounter.addMotor(res.data);
      }, gmHandleError(this.errors, 'Could not save new motorbike').bind(this));
    };

    this.updateMotor = (motor) => {
      $http.put(baseUrl + '/api/motor/' + motor.model, motor)
      .then(() => {
        motor.editing = false;
      }, gmHandleError(this.errors, 'Could not update motorbike: ' + motor.model).bind(this));
    };

    this.removeMotor = (motor) => {
      $http.delete(baseUrl + '/api/motor/' + motor.model, motor)
      .then(() => {
        this.motors.splice(this.motors.indexOf(motor), 1);
        this.gmCounter.motorBikes.splice(this.gmCounter.motorBikes.indexOf(motor), 1);
      }, gmHandleError(this.errors, 'Could not delete motorbike: ' + motor.model).bind(this));
    };

    this.backup = (motor) => {
      motor.backup = angular.copy(motor);
    };

    this.restoreBackup = (motor) => {
      angular.copy(motor.backup, motor);
    };

    this.deleteBakcup = (motor) => {
      delete motor.backup;
    };
  }]);
};
