'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    CurrentModel = mongoose.model('Estudiante'),
    Institucion = mongoose.model('Institucion'),
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
    //value.user = req.user;
    //Institucion
    //res.jsonp({dddd: req.body.institucionId});

    Institucion.load(req.body.institucionId, function(err, item) {
        
        if (!item) return new Error('Failed to load item ' + req.body.institucionId);
        value.institucion = item;
        value.save(function(err) {
            if (err) {
                return res.send('users/signup', {
                    errors: err.errors,
                    estudiante: value
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
