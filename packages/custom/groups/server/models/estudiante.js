'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var Schema = new Schema({
    nombre: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    institucion: {
        type: Schema.ObjectId,
        ref: 'Institucion'
    }
});

/**
 * Statics
 */
Schema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('intitucion', 'title').exec(cb);
};

mongoose.model('Estudiante', Schema);
