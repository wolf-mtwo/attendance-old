'use strict';

angular.module('mean.groups').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('groups example page', {
      url: '/groups/example',
      templateUrl: 'groups/views/index.html'
    });

    var path = 'groups/';

    $stateProvider.state('groups-index', {
      url: '/groups',
      templateUrl: path + '/views/index.html'
    });

    $stateProvider.state('groups-create', {
      url: '/groups/create',
      templateUrl: path + '/views/create.html'
    });
  }
]);
