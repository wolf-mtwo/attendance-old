'use strict';

// Requires meanio .
var mean = require('meanio');

// Creates and serves mean application
mean.serve({ /*options placeholder*/ }, function(app, config) {
	var port = config.https && config.https.port ? config.https.port : config.http.port;
	console.log('Mean app started on port ' + port + ' (' + process.env.NODE_ENV + ')');

	app.use(function(req, res, next) {
		if(!req.url.split('.')[1]) {
			res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
			res.header('Pragma', 'no-cache');
		}
		next();
	});

});
