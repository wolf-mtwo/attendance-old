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
    group: {
        type: Schema.ObjectId,
        ref: 'Group'
    }
});

/**
 * Statics
 */
Schema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('Group', 'title').exec(cb);
};

mongoose.model('Participant', Schema);
