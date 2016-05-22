const angular = require('angular');

const motorApp = angular.module('motorApp', []);
const baseUrl = 'http://localhost:5000';

var handleError = function(error, [$log]) {
  $log(error);
  this.errors = (this.errors || []).push(error);
};

motorApp.controller('MotorController', function($http) {
  this.motors = [];
  this.getAll = () => {
    $http.get(baseUrl + '/api/motor')
      .then((res) => {
        this.motors = res.data;
      }, handleError.bind(this));
  };

  this.createMotor = () => {
    $http.post(baseUrl + '/api/motor', this.newMotor)
      .then((res) => {
        this.motors.push(res.data);
        this.newMotor = null;
      }, handleError.bind(this));
  };

  this.updateMotor = (motor) => {
    $http.put(baseUrl + '/api/motor/' + motor.model, motor)
      .then(() => {
        motor.editing = false;
      }, handleError.bind(this));
  };

  this.removeMotor = (motor) => {
    $http.delete(baseUrl + '/api/motor/' + motor.model, motor)
      .then(() => {
        this.motors.splice(this.motor.indexOf(motor), 1);
      }, handleError.bind(this));
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
});
angular.bootstrap(document.getElementById('motorApp'), ['motorApp']);
