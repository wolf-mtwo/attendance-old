'use strict';

var groups = require('../controllers/groups');

// The Package is past automatically as first parameter
module.exports = function(Groups, app, auth, database) {

  app.route('/groups')
    .get(groups.all)
    .post(auth.requiresLogin, groups.create);

  // app.route('/groups/:articleId')
  //   .get(auth.isMongoId, groups.show)
  //   .put(auth.isMongoId, auth.requiresLogin, groups.update)
  //   .delete(auth.isMongoId, auth.requiresLogin, groups.destroy);

    // Finish with setting up the articleId param
  app.param('articleId', groups.institucion);

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
