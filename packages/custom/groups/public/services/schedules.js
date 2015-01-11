'use strict';

angular.module('mean.groups').factory('Schedules', ['$resource',
  function($resource) {
    return $resource('groups/:groupId/schedules/:scheduleId', {
      scheduleId: '@_id',
      groupId: '@groupId'
  	}, {
  		update: {
  			method: 'PUT'
  		}
  	});
  }
]);
