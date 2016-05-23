const angular = require('angular');

const bikeApp = angular.module('bikeApp', []);
const baseUrl = 'http://localhost:5000';

var handleError = function(error, [$log]) {
  $log(error);
  this.errors = (this.errors || []).push(error);
};

bikeApp.controller('PedalController', ['$http', function($http) {
  this.pedals = [];
  this.getAll = () => {
    $http.get(baseUrl + '/api/pedal')
      .then((res) => {
        this.pedals = res.data;
      }, handleError.bind(this));
  };

  this.createPedal = () => {
    $http.post(baseUrl + '/api/pedal', this.newPedal)
      .then((res) => {
        this.pedals.push(res.data);
        this.newPedal = null;
      }, handleError.bind(this));
  };

  this.updatePedal = (pedal) => {
    $http.put(baseUrl + '/api/pedal/' + pedal.model, pedal)
      .then(() => {
        pedal.editing = false;
      }, handleError.bind(this));
  };

  this.removePedal = (pedal) => {
    $http.delete(baseUrl + '/api/pedal/' + pedal.model)
      .then(() => {
        this.pedals.splice(this.pedals.indexOf(pedal), 1);
      }, handleError.bind(this));
  };

  this.backup = (pedal) => {
    pedal.backup = angular.copy(pedal);
  };

  this.restoreBackup = (pedal) => {
    angular.copy(pedal.backup, pedal);
  };

  this.deleteBakcup = (pedal) => {
    delete pedal.backup;
  };

}]);

bikeApp.controller('MotorController', ['$http', function($http) {
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
        this.motors.splice(this.motors.indexOf(motor), 1);
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
}]);
