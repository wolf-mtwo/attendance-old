'use strict';

var controller = require('../controllers/participants');

module.exports = function(Participants, app, auth, database) {
    app.get('/groups/:groupId/participants', controller.all);
    app.post('/groups/:groupId/participants', controller.create);

    app.put('/groups/:groupId/participants/:participantId', controller.update);
    app.delete('/groups/:groupId/participants/:participantId', controller.destroy);
    app.get('/groups/:groupId/participants/:participantId', controller.show);
    app.param('participantId', controller.participant);
    app.param('groupId', controller.group);
};
