module.exports = function(app) {
  app.directive('pedalListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngcontroller',
      transclude: true,
      templateUrl: '/templates/pedals/directives/pedal-list-item.html',
      scope: {
        pedal: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.removePedal = controller.removePedal;
      }
    };
  });
};
