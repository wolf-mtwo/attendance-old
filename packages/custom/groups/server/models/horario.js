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
    participant: {
        type: Schema.ObjectId,
        ref: 'Participant'
    }
});

/**
 * Statics
 */
Schema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('day', 'institucion').populate('participant', 'nombre email').exec(cb);
};

mongoose.model('Horario', Schema);
