'use strict';

var controller = require('../controllers/participants');

module.exports = function(Participants, app, auth, database) {

  var path = '/groups/:groupId/participants';
  app.get(path, controller.all);
  app.post(path, controller.create);

  path += '/:participantId';
  app.put(path, controller.update);
  app.delete(path, controller.destroy);
  app.get(path, controller.show);

  path += '/attendance';
  app.get(path, controller.attendance);

  app.param('participantId', controller.participant);
  app.param('groupId', controller.group);
};
