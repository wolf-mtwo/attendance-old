'use strict';

var controller = require('../controllers/days');

module.exports = function(Days, app, auth, database) {
    app.get('/day', controller.all);
    app.post('/day', controller.create);
    app.put('/day/:dayId', controller.update);
    app.delete('/day/:dayId', controller.destroy);
    app.get('/day/:dayId', controller.show);
    app.get('/day/:institucionId/institucion', controller.allByInstitucion);
    app.param('dayId', controller.day);
    app.param('institucionId', controller.institucion);
};

