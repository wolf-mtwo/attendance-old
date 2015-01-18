'use strict';

angular.module('mean.groups').config(['$stateProvider',
    function($stateProvider) {

      var path = 'groups/views';
      var url = '/groups/:groupId';

      $stateProvider.state('report', {
        url: url + '/reports',
        templateUrl: path + '/reports/index.html'
      });
    }
]);
