'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  CurrentModel = mongoose.model('Attendance'),
  Schedule = mongoose.model('Schedule'),
  Group = mongoose.model('Group'),
  _ = require('lodash');

exports.attendance = function(req, res, next, id) {
  CurrentModel.load(id, function(err, item) {
    if (err) return next(err);
    if (!item) return next(new Error('Failed to load item ' + id));
    req.attendance = item;
    next();
  });
};

exports.schedule = function(req, res, next, id) {
  Schedule.load(id, function(err, item) {
    if (err) return next(err);
    if (!item) return next(new Error('Failed to load item ' + id));
    req.schedule = item;
    next();
  });
};

exports.group = function(req, res, next, id) {
  Group.load(id, function(err, item) {
    if (err) return next(err);
    if (!item) return next(new Error('Failed to load item ' + id));
    req.group = item;
    next();
  });
};

exports.create = function(req, res) {
  var value = new CurrentModel(req.body);
  value.group = req.group;
  value.schedule = req.schedule;

  value.save(function(err) {
    if (err) {
      return res.send('users/signup', {
        errors: err.errors,
        object: value
      });
    } else {
      res.jsonp(value);
    }
  });
};

exports.update = function(req, res) {
  var item = req.attendance;
  item = _.extend(item, req.body);

  item.save(function(err) {
    if (err) {
      return res.send('users/signup', {
        errors: err.errors,
        object: item
      });
    } else {
      res.jsonp(item);
    }
  });
};

exports.destroy = function(req, res) {
  var item = req.attendance;

  item.remove(function(err) {
    if (err) {
      return res.send('users/signup', {
        errors: err.errors,
        object: item
      });
    } else {
      res.jsonp(item);
    }
  });
};

exports.show = function(req, res) {
  res.jsonp(req.attendance);
};

exports.all = function(req, res) {
  CurrentModel.find({ group: req.group, schedule: req.schedule }).populate('participant', 'name email').exec(function(err, items) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(items);
    }
  });
};
