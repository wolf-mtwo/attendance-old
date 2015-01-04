'use strict';

angular.module('mean.groups').factory('Groups', ['$resource',
  function($resource) {
    return $resource('groups/:groupId', {
      groupId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
