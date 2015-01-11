'use strict';

var controller = require('../controllers/schedules');

module.exports = function(Horarios, app, auth, database) {
  var path = '/groups/:groupId/schedules/';
  app.get(path, controller.all);
  app.post(path, controller.create);
  app.put(path + ':scheduleId', controller.update);
  app.delete(path + ':scheduleId', controller.destroy);
  app.get(path + ':scheduleId', controller.show);
  app.param('scheduleId', controller.schedule);
  app.param('groupId', controller.group);
};
