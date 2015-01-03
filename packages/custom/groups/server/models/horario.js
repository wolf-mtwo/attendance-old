'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Schema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    day: {
        type: Schema.ObjectId,
        ref: 'Day'
    },
    status: {
        type: String
    },
    estudiante: {
        type: Schema.ObjectId,
        ref: 'Estudiante'
    }
});

/**
 * Statics
 */
Schema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('day', 'institucion').populate('estudiante', 'nombre email').exec(cb);
};

mongoose.model('Horario', Schema);
