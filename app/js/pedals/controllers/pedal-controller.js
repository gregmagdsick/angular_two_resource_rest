const baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('PedalController', ['$http', 'gmHandleError', 'gmCounter', function($http, gmHandleError, gmCounter) { // eslint-disable-line max-len
    this.gmCounter = gmCounter;
    this.pedals = this.gmCounter.pedalBikes;
    this.getAll = () => {
      $http.get(baseUrl + '/api/pedal')
      .then((res) => {
        this.pedals = this.gmCounter.pedalBikes = res.data;
      }, gmHandleError(this.errors, 'Could not get pedalbikes from server').bind(this));
    };

    this.createPedal = () => {
      $http.post(baseUrl + '/api/pedal', this.newPedal)
      .then((res) => {
        this.newPedal = null;
        this.gmCounter.addPedal(res.data);
      }, gmHandleError(this.errors, 'Could not save new pedalbike').bind(this));
    };

    this.updatePedal = (pedal) => {
      $http.put(baseUrl + '/api/pedal/' + pedal.model, pedal)
      .then(() => {
        pedal.editing = false;
      }, gmHandleError(this.errors, 'Could not update pedalbike: ' + pedal.model).bind(this));
    };

    this.removePedal = (pedal) => {
      $http.delete(baseUrl + '/api/pedal/' + pedal.model)
      .then(() => {
        this.gmCounter.pedalBikes.splice(this.gmCounter.pedalBikes.indexOf(pedal), 1);
      }, gmHandleError(this.errors, 'Cold not delete pedalbike: ' + pedal.model).bind(this));
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
