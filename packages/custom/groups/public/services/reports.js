'use strict';

angular.module('mean.groups').factory('Reports', ['$resource',
  function($resource) {
    var url = 'groups/:groupId/reports/';
    return $resource('default', {
      scheduleId: '@_id',
      groupId: '@groupId'
  	}, {
      attendance: {
  			method: 'GET',
        isArray: true,
        url: url + 'attendance'
  		},
      state: {
  			method: 'GET',
        isArray: true,
        url: url + 'state'
  		},
      users: {
  			method: 'GET',
        isArray: true,
        url: url + 'users'
  		}
  	});
  }
]);
