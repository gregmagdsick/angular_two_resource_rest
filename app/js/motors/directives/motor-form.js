module.exports = function(app) {
  app.directive('motorForm', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: 'templates/motors/directives/motor-form.html',
      scope: {
        motor: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.updateMotor,
          create: controller.createMotor
        };
        scope.save = actions[scope.action];
      }
    };
  });
};
