'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    
     CurrentModel = mongoose.model('Institucion'),
     _ = require('lodash');
    


/**
 * Find article by id
 */
exports.institucion = function(req, res, next, id) {
    CurrentModel.load(id, function(err, item) {
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
    value.user = req.user;

    value.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                institucion: value
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
    var item = req.institucion;

    item = _.extend(item, req.body);

    item.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                institucion: item
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
    var item = req.institucion;

    // res.jsonp({item :  item,  hi:'hola'});

    item.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                institucion: item
            });
        } else {
            res.jsonp(item);
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.jsonp(req.institucion);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    
    //Article.find().sort('-created').populate('user', 'name username').exec(function(err, articles) {
    CurrentModel.find({ user: req.user }).exec(function(err, items) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(items);
        }
    });
};
