const angular = require('angular');

const pedalApp = angular.module('pedalApp', []);
const baseUrl = 'http://localhost:5000';

var handleError = function(error, [$log]) {
  $log(error);
  this.errors = (this.errors || []).push(error);
};

pedalApp.controller('PedalController', ['$http', function($http) {
  this.pedals = [];

  this.backup = (pedal) => {
    pedal.backup = angular.copy(pedal);
  };

  this.restoreBackup = (pedal) => {
    angular.copy(pedal.backup, pedal);
  };

  this.deleteBakcup = (pedal) => {
    delete pedal.backup;
  };

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
        this.pedals.splice(this.pedal.indexOf(pedal), 1);
      }, handleError.bind(this));
  };
}]);
