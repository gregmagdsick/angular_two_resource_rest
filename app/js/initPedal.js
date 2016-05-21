const angular = require('angular');

const pedalApp = angular.module('pedalApp', []);
const baseUrl = 'http://localhost:5000';

var handleError = function(error, [$log]) {
  $log(error);
  this.errors = (this.errors || []).push(error);
};

pedalApp.controller('PedalController', function($http) {
  const vm = this;
  vm.pedal = [];
  vm.getAll = () => {
    $http.get(baseUrl + '/api/pedal')
      .then((res) => {
        vm.motor = res.data;
      }, handleError.bind(vm));
  };

  vm.createPedal = () => {
    $http.post(baseUrl + '/api/pedal', vm.newPedal)
      .then((res) => {
        vm.pedal.push(res.data);
        vm.newPedal = null;
      }, handleError.bind(vm));
  };

  vm.updatePedal = (pedal) => {
    $http.put(baseUrl + '/api/pedal/' + pedal.model, pedal)
      .then(() => {
        pedal.editing = false;
      }, handleError.bind(vm));
  };

  vm.removePedal = (pedal) => {
    $http.delete(baseUrl + '/api/pedal/' + pedal.model, pedal)
      .then(() => {
        vm.pedal.splice(vm.pedal.indexOf(pedal), 1);
      }, handleError.bind(vm));
  };
});
