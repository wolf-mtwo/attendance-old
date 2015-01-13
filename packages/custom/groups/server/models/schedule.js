'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SchemaGeneric = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Boolean,
    default: false
  },
  group: {
    type: Schema.ObjectId,
    ref: 'Group'
  }
});

SchemaGeneric.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('group', 'title user').exec(cb);
};
mongoose.model('Schedule', SchemaGeneric);
