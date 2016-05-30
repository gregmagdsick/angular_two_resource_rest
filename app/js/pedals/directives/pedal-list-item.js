module.exports = function(app) {
  app.directive('pedalListItem', function() { // eslint-disable-line prefer-arrow-callback
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/pedals/directives/pedal-list-item.html',
      scope: {
        pedal: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.backup = controller.backup;
        scope.removePedal = controller.removePedal;
      }
    };
  });
};
