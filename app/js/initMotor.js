const angular = require('angular');

const crudApp = angular.module('crudApp', []);
const baseUrl = 'http://localhost:8080';

var handleError = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};

crudApp.controller('MotorController', [$http, function($http) {
  this.motor = [];
  this.getAll = () => {
    $http.get(baseUrl + '/api/motor')
      .then((res) => {
        this.motor = res.data;
      }, handleError.bind(this));
  };

  this.createMotor = () => {
    $http.post(baseUrl + '/api/motor', this.newMotor)
      .then((res) => {
        this.motor.push(res.data);
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
        this.motor.splice(this.motor.indexOf(motor), 1);
      }, handleError.bind(this));
  };
}]);
