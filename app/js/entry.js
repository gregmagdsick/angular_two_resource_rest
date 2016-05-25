const angular = require('angular');
const bikeApp = angular.module('bikeApp', []);

require('./services')(bikeApp);
require('./pedals')(bikeApp);
require('./motors')(bikeApp);
