'use strict';

angular.module('mean.groups').factory('Days', ['$resource',
  function($resource) {
    return $resource('groups/:groupId/days/:dayId', {
      dayId: '@_id',
      groupId: '@groupId'
  	}, {
  		update: {
  			method: 'PUT'
  		}
  	});
  }
]);
