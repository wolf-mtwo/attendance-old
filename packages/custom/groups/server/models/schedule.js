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
  group: {
    type: Schema.ObjectId,
    ref: 'Group'
  }
});

Schema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('group', 'title').exec(cb);
};
mongoose.model('Schedule', Schema);
