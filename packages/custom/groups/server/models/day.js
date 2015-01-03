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

mongoose.model('Day', Schema);
