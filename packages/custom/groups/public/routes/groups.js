'use strict';

angular.module('mean.groups').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('groups example page', {
      url: '/groups/example',
      templateUrl: 'groups/views/index.html'
    });

    var path = 'groups';

    $stateProvider.state('groups-index', {
      url: '/groups',
      templateUrl: path + '/views/index.html'
    });

    $stateProvider.state('groups-create', {
      url: '/groups/create',
      templateUrl: path + '/views/create.html'
    });

    $stateProvider.state('groups-remove', {
      url: '/groups/:groupId/remove',
      templateUrl: path + '/views/remove.html'
    });

    $stateProvider.state('groups-edit', {
      url: '/groups/:groupId/edit',
      templateUrl: path + '/views/edit.html'
    });

    $stateProvider.state('groups', {
      url: '/groups/:groupId',
      templateUrl: path + '/views/view.html'
    });

    $stateProvider.state('groups-attendance', {
      url: '/groups/:groupId/attendance',
      templateUrl: path + '/views/attendance/index.html'
    });

    $stateProvider.state('groups-schedule', {
      url: '/groups/:groupId/schedule',
      templateUrl: path + '/views/schedule/index.html'
    });

    $stateProvider.state('groups-schedule-list', {
      url: '/groups/:groupId/schedule/:scheduleId',
      templateUrl: path + '/views/schedule/list.html'
    });

    $stateProvider.state('groups-participant-create', {
      url: '/groups/:groupId/participants/create',
      templateUrl: path + '/views/participant/create.html'
    });
  }
]);
