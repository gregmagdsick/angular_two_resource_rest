module.exports = function(app) {
  require('./gm-counter')(app);
  require('./gm-handle-error')(app);
};
