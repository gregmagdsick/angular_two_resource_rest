const angular = require('angular');

const crudApp = angular.module('crudApp', []);
const baseUrl = 'http://localhost:8080';

var handleError = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};

crudApp.controller('PedalController', [$http, function($http) {
  this.pedal = [];
  this.getAll = () => {
    $http.get(baseUrl + '/api/pedal')
      .then((res) => {
        this.motor = res.data;
      }, handleError.bind(this));
  };

  this.createPedal = () => {
    $http.post(baseUrl + '/api/pedal', this.newPedal)
      .then((res) => {
        this.pedal.push(res.data);
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
    $http.delete(baseUrl + '/api/pedal/' + pedal.model, pedal)
      .then(() => {
        this.pedal.splice(this.pedal.indexOf(pedal), 1);
      }, handleError.bind(this));
  };
}]);
