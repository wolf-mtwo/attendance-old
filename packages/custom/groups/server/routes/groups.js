'use strict';

// The Package is past automatically as first parameter
module.exports = function(Groups, app, auth, database) {

  app.get('/groups/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/groups/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/groups/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/groups/example/render', function(req, res, next) {
    Groups.render('index', {
      package: 'groups'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
