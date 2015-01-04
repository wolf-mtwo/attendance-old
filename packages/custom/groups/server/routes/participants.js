'use strict';

var controller = require('../controllers/participants');

module.exports = function(Participants, app, auth, database) {
    // app.get('/estudiante', controller.all);
    // app.post('/estudiante', controller.create);
    app.post('/groups/:groupId/participant', controller.create);
    // app.put('/estudiante/:estudianteId', controller.update);
    // app.delete('/estudiante/:estudianteId', controller.destroy);
    // app.get('/estudiante/:estudianteId', controller.show);
    // app.get('/estudiante/:institucionId/institucion', controller.allByInstitucion);
    // app.param('estudianteId', controller.estudiante);
    // app.param('institucionId', controller.institucion);
    app.param('groupId', controller.group);
};
