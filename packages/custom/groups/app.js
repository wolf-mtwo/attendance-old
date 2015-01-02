'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Groups = new Module('groups');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Groups.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Groups.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Groups.menus.add({
    title: 'groups example page',
    link: 'groups example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Groups.aggregateAsset('css', 'groups.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Groups.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Groups.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Groups.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Groups;
});
