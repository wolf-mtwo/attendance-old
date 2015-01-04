'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    CurrentModel = mongoose.model('Participant'),
    Group = mongoose.model('Group'),
    _ = require('lodash');



/**
 * Find article by id
 */
exports.estudiante = function(req, res, next, id) {
    CurrentModel.load(id, function(err, item) {
        if (err) return next(err);
        if (!item) return next(new Error('Failed to load item ' + id));
        req.estudiante = item;
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

/**
 * Create an article
 */
exports.create = function(req, res) {
  var value = new CurrentModel(req.body);
  value.group = req.group;
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

/**
 * Update an article
 */
exports.update = function(req, res) {
    var item = req.estudiante;

    item = _.extend(item, req.body);

    item.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                estudiante: item
            });
        } else {
            res.jsonp(item);
        }
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    // var item = req.params;
    var item = req.estudiante;

    // res.jsonp({item :  item,  hi:'hola'});

    item.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                estudiante: item
            });
        } else {
            res.jsonp(item);
        }
    });
};

// /**
//  * Show an article
//  */
exports.show = function(req, res) {
    res.jsonp(req.estudiante);
};

exports.all = function(req, res) {
        CurrentModel.find().exec(function(err, items) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(items);
            }
        });

    //Article.find().sort('-created').populate('user', 'name username').exec(function(err, articles) {

};

exports.allByInstitucion = function(req, res) {

    //req.params.name
    CurrentModel.find({ institucion: req.institucion }).exec(function(err, items) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(items);
        }
    });
};
