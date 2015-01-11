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
  schedule: {
    type: Schema.ObjectId,
    ref: 'Schedule'
  },
  group: {
    type: Schema.ObjectId,
    ref: 'Group'
  },
  status: {
    type: String
  },
  participant: {
    type: Schema.ObjectId,
    ref: 'Participant'
  }
});

SchemaGeneric.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('schedule', 'participant').populate('participant', 'nombre email').exec(cb);
};

mongoose.model('Attendance', SchemaGeneric);
