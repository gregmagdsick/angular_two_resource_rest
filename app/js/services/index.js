module.exports = function(app) {
  require('./gm-handle-error')(app);
  require('./gm-resource-handler')(app);
};
