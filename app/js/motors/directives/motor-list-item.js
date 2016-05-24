module.exports = function(app) {
  app.directive('motorListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/motors/directives/motor-list-item.html',
      scope: {
        motor: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.backup = controller.backup;
        scope.removeMotor = controller.removeMotor;
      }
    };
  });
};
