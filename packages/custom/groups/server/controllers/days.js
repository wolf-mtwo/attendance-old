'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    CurrentModel = mongoose.model('Day'),
    Institucion = mongoose.model('Institucion'),
    _ = require('lodash');
    


exports.day = function(req, res, next, id) {
    CurrentModel.load(id, function(err, item) {
        if (err) return next(err);
        if (!item) return next(new Error('Failed to load item ' + id));
        req.day = item;
        next();
    });
};

exports.institucion = function(req, res, next, id) {

    Institucion.load(id, function(err, item) {
        if (err) return next(err);
        if (!item) return next(new Error('Failed to load item ' + id));
        req.institucion = item;
        next();
    });
};

/**
 * Create an article
 */
exports.create = function(req, res) {
    var value = new CurrentModel(req.body);
    //res.jsonp({dddd: req.body.institucionId});
    Institucion.load(req.body.institucionId, function(err, item) {
        
        if (!item) return new Error('Failed to load item ' + req.body.institucionId);
        value.institucion = item;
        value.save(function(err) {
            if (err) {
                return res.send('users/signup', {
                    errors: err.errors,
                    day: value
                });
            } else {
                res.jsonp(value);
            }
        });
    });

    
};

/**
 * Update an article
 */
exports.update = function(req, res) {
    var item = req.day;

    item = _.extend(item, req.body);

    item.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                day: item
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
    var item = req.day;

    // res.jsonp({item :  item,  hi:'hola'});

    item.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                day: item
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
    res.jsonp(req.day);
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
