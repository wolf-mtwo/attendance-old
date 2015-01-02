'use strict';

angular.module('mean.groups').controller('GroupsController', ['$scope', 'Global', 'Groups',
  function($scope, Global, Groups) {
    $scope.global = Global;
    $scope.package = {
      name: 'groups'
    };
  }
]);
