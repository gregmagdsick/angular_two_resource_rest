module.exports = function(app) {
  app.directive('pedalForm', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: 'templates/pedals/directives/pedal-form.html',
      scope: {
        pedal: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.updatePedal,
          create: controller.createPedal
        };
        scope.save = actions[scope.action];
      }
    };
  });
};
