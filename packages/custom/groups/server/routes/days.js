'use strict';

var controller = require('../controllers/days');

module.exports = function(Days, app, auth, database) {
  var path = '/groups/:groupId/days/';
  app.get(path, controller.all);
  app.post(path, controller.create);
  app.put(path + ':dayId', controller.update);
  app.delete(path + ':dayId', controller.destroy);
  app.get(path + ':dayId', controller.show);
  app.param('dayId', controller.day);
  app.param('groupId', controller.group);
};
