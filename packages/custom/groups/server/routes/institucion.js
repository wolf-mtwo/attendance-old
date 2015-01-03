'use strict';

var controller = require('../controllers/instituciones');

// The Package is past automatically as first parameter
module.exports = function(Institucion, app, auth, database) {

     /*app.route('/articles/:articleId')
        .get(articles.show)
        .put(auth.requiresLogin, hasAuthorization, articles.update)
        .delete(auth.requiresLogin, hasAuthorization, articles.destroy);*/
        /*app.route('/articles')
        .get(articles.all)
        .post(auth.requiresLogin, articles.create);*/

    app.get('/institucion', controller.all);
    app.post('/institucion', controller.create);
    app.put('/institucion/:institucionId', controller.update);
    app.delete('/institucion/:institucionId', controller.destroy);
    app.get('/institucion/:institucionId', controller.show);
    app.param('institucionId', controller.institucion);
};



/*
'use strict';




module.exports = function(Articles, app, auth) {

    
    app.route('/articles/:articleId')
        .get(articles.show)
        .put(auth.requiresLogin, hasAuthorization, articles.update)
        .delete(auth.requiresLogin, hasAuthorization, articles.destroy);

    // Finish with setting up the articleId param
    app.param('articleId', articles.article);
};
*/