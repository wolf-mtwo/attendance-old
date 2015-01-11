'use strict';

angular.module('mean.groups').factory('Attendance', ['$resource',
  function($resource) {
    return $resource('groups/:groupId/schedules/:scheduleId/attendance/:attendanceId', {
      attendanceId: '@_id',
      scheduleId: '@scheduleId',
      groupId: '@groupId'
  	}, {
  		update: {
  			method: 'PUT'
  		}
  	});
  }
]);
