'use strict';

angular.module('mean.groups').config(['$stateProvider',
  function($stateProvider) {

    var path = 'groups/views/participant/';
    $stateProvider.state('participant', {
      url: '/groups/:groupId/participants/:participantId',
      controller: 'ParticipantsController',
      templateUrl: path + 'index.html'
    });

  }
]);
