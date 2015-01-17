'use strict';

angular.module('mean.groups').factory('Participants', ['$resource',
  function($resource) {
    var path = 'groups/:groupId/participants/:participantId';
    return $resource(path, {
      groupId: '@groupId',
      participantId: '@_id'
  	}, {
  		update: {
  			method: 'PUT'
  		},
  		attendance: {
  			method: 'GET',
        isArray: true,
        url: path + '/attendance'
  		}
  	});
  }
]);
