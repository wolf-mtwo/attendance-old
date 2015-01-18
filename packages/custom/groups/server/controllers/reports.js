'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Attendance = mongoose.model('Attendance'),
  Group = mongoose.model('Group');

exports.group = function(req, res, next, id) {
  Group.load(id, function(err, item) {
    if (err) return next(err);
    if (!item) return next(new Error('Failed to load item ' + id));
    req.group = item;
    next();
  });
};

exports.loadUsersAttendance = function(req, res) {
  Attendance.aggregate([
    {
      $match: {
        group: req.group._id
      }
    },{
      $group: {
        _id: '$schedule',
        participants: {$push: '$participant'}
      }
    }
  ]).exec(function(err, items) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(items);
    }
  });
};

exports.totalAttendanceUsers = function(req, res) {
  Attendance.aggregate([
    {
      $match: {
        group: req.group._id
      }
    },{
      $group: {
        _id: '$participant',
        status: {$push: '$status'}
      }
    }
  ]).exec(function(err, items) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(items);
    }
  });
};

exports.totalAttendancebyState = function(req, res) {
  Attendance.aggregate([
    {
      $match: {
        group: req.group._id
      }
    },{
      $group: {
        _id: '$status',
        participant: {$push: '$participant'}
      }
    }
  ]).exec(function(err, items) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(items);
    }
  });
};
