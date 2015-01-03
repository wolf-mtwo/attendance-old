'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    CurrentModel = mongoose.model('Horario'),
    Estudiante = mongoose.model('Estudiante'),
    Institucion = mongoose.model('Institucion'),
    Day = mongoose.model('Day'),
    _ = require('lodash');
    


exports.horario = function(req, res, next, id) {
    CurrentModel.load(id, function(err, item) {
        if (err) return next(err);
        if (!item) return next(new Error('Failed to load item ' + id));
        req.horario = item;
        next();
    });
};

/**
 * Create an article
 */
exports.create = function(req, res) {
    var value = new CurrentModel(req.body);
    //res.jsonp({dddd: req.body.institucionId});
    Estudiante.load(req.body.estudianteId, function(err, item) {
        Day.load(req.body.dayId, function(err, day) {
        
            //if (!item) return new Error('Failed to load item ' + req.body.institucionId);
            //value.estudiante_id = req.body.estudianteId;
            value.estudiante = item;
            value.day = day;

            //res.jsonp(value);

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
    });

    
};

/**
 * Update an article
 */
exports.update = function(req, res) {
    var item = req.horario;

    item = _.extend(item, req.body);

    item.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                horario: item
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
    var item = req.horario;

    // res.jsonp({item :  item,  hi:'hola'});

    item.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                horario: item
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
    res.jsonp(req.horario);
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

exports.horest = function(req, res) {


    // $http.get('/horario/estudiante', {
    //             estudianteId: estudiante._id,
    //             institucionId: $stateParams.institucionId
    //         })

    Estudiante.load(req.body.estudianteId, function(err, item) {
                    
                CurrentModel.find({estudiante : item }).exec(function(err, items) {
                    if (err) {
                        res.render('error', {
                            status: 500
                        });
                    } else {
                        res.jsonp(items);
                    }
                });
            
    });

    
};


exports.horinst = function(req, res) {
    Institucion.load(req.body.institucionId, function(err, item) {
        Day.find({institucion : item }).exec(function(err, items) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(items);
            }
        }); 
    });
};


exports.horday = function(req, res) {
    Day.load(req.body.dayId, function(err, item) {
        CurrentModel.find({day : item }).exec(function(err, items) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(items);
            }
        }); 
    });
};