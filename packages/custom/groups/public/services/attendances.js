'use strict';

angular.module('mean.groups').factory('Attendances', ['$resource',
  function($resource) {
    return $resource('groups/:groupId/attendances/:attendanceId', {
      attendanceId: '@_id',
      groupId: '@groupId'
  	}, {
  		update: {
  			method: 'PUT'
  		}
  	});
  }
]);
