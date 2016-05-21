const angular = require('angular');

angular.module('motorApp', []);
const baseUrl = 'http://localhost:5000';

var handleError = function(error, [$log]) {
  $log(error);
  this.errors = (this.errors || []).push(error);
};

angular
  .module('motorApp')
  .controller('MotorController', function($http) {
  const vm = this;
  vm.motor = [];
  vm.getAll = () => {
    $http.get(baseUrl + '/api/motor')
      .then((res) => {
        vm.motor = res.data;
      }, handleError.bind(vm));
  };

  vm.createMotor = () => {
    $http.post(baseUrl + '/api/motor', vm.newMotor)
      .then((res) => {
        vm.motor.push(res.data);
        vm.newMotor = null;
      }, handleError.bind(vm));
  };

  vm.updateMotor = (motor) => {
    $http.put(baseUrl + '/api/motor/' + motor.model, motor)
      .then(() => {
        motor.editing = false;
      }, handleError.bind(vm));
  };

  vm.removeMotor = (motor) => {
    $http.delete(baseUrl + '/api/motor/' + motor.model, motor)
      .then(() => {
        vm.motor.splice(vm.motor.indexOf(motor), 1);
      }, handleError.bind(vm));
  };
});
