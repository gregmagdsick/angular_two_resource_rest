module.exports = function(app) {
  app.factory('gmHandleError', function() { // eslint-disable-line prefer-arrow-callback
    return function(errorsArr, message) {
      return function(err) {
        console.log(err);
        if (Array.isArray(errorsArr)) {
          errorsArr.push(new Error(message || 'Sorry, a server error occured'));
        }
      };
    };
  });
};
