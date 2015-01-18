'use strict';

angular.module('mean.groups').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('groups example page', {
      url: '/groups/example',
      templateUrl: 'groups/views/index.html'
    });

    var path = 'groups/views';
    $stateProvider.state('groups-index', {
      url: '/groups',
      templateUrl: path + '/index.html'
    });

    $stateProvider.state('groups-create', {
      url: '/groups/create',
      templateUrl: path + '/groups/create.html'
    });

    var url = '/groups/:groupId';
    $stateProvider.state('groups', {
      url: url,
      templateUrl: path + '/groups/index.html'
    });

    $stateProvider.state('groups-remove', {
      url: url + '/remove',
      templateUrl: path + '/groups/remove.html'
    });

    $stateProvider.state('groups-edit', {
      url: url + '/edit',
      templateUrl: path + '/groups/edit.html'
    });

    //different URL
    $stateProvider.state('groups-attendance', {
      url: url + '/attendance',
      templateUrl: path + '/attendance/index.html'
    });

    $stateProvider.state('groups-schedule', {
      url: url + '/schedule',
      templateUrl: path + '/schedule/index.html'
    });

    $stateProvider.state('groups-schedule-list', {
      url: url + '/schedule/:scheduleId',
      templateUrl: path + '/schedule/list.html'
    });

    $stateProvider.state('groups-participant-create', {
      url: url + '/participants/create',
      templateUrl: path + '/participant/create.html'
    });
  }
]);
