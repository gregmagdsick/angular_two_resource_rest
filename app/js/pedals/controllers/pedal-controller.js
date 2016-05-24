const handleError = require('../../lib/').handleError;
const baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('PedalController', ['$http', function($http) {
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
};
