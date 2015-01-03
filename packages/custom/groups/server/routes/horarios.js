'use strict';

var controller = require('../controllers/horarios');

module.exports = function(Horarios, app, auth, database) {
    app.get('/horario', controller.all);
    app.post('/horario/estudiante', controller.horest);
    app.post('/horario/institucion', controller.horinst);
    app.post('/horario/day', controller.horday);
    app.post('/horario', controller.create);
    app.put('/horario/:horarioId', controller.update);
    app.delete('/horario/:horarioId', controller.destroy);
    app.get('/horario/:horarioId', controller.show);
    app.param('horarioId', controller.horario);
};