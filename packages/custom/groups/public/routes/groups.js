'use strict';

angular.module('mean.groups').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('groups example page', {
      url: '/groups/example',
      templateUrl: 'groups/views/index.html'
    });
    $stateProvider.state('groups-index', {
      url: '/groups',
      templateUrl: 'groups/views/index.html'
    });
  }
]);
