'use strict';

angular.module('mean.groups').factory('Attendance', ['$resource',
  function($resource) {
    return $resource('groups/:groupId/schedules/:scheduleId/attendance/:attendanceId', {
      attendanceId: '@_id',
      scheduleId: '@schedule',
      groupId: '@group'
  	}, {
  		update: {
  			method: 'PUT'
  		}
  	});
  }
]);
