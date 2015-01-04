'use strict';

angular.module('mean.groups').factory('Participants', ['$resource',
  function($resource) {
    return $resource('groups/:groupId/participants/:participantId', {
      groupId: '@groupId',
      participantId: '@_id'
  	}, {
  		update: {
  			method: 'PUT'
  		}
  	});
  }
]);
