'use strict';

var controller = require('../controllers/reports');

module.exports = function(Participants, app, auth, database) {

  var path = '/groups/:groupId/reports/';
  app.get(path + 'attendance', controller.loadUsersAttendance);
  app.get(path + 'state', controller.totalAttendancebyState);
  app.get(path + 'users', controller.totalAttendanceUsers);

  app.param('groupId', controller.group);
};
