'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var GroupSchema = new Schema({
    title: {
        type: String,
        default: ''
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    position: {
      type: Number,
      default: null
    },
    created: {
      type: Date,
      default: Date.now
    }
});

/**
 * Statics
 */
GroupSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Group', GroupSchema);
