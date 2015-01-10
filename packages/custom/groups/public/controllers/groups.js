'use strict';
angular.module('mean.groups').controller('GroupsController', ['$scope', '$http', '$stateParams', '$location', 'Global', 'Groups', 'Participants',
  function($scope, $http, $stateParams, $location, Global, Groups, Participants) {
    $scope.global = Global;
    $scope.group = {};

    $scope.find = function() {
      Groups.query(function(value) {
        $scope.groups = value;
      });
    };

    $scope.create = function() {
      var value = new Groups({
        title: this.title,
        content: this.content
      });
      value.$save(function(response) {
        $location.path('groups');
      });
    };

    $scope.findOne = function() {
      Groups.get({
        groupId: $stateParams.groupId
      }, function(response) {
        $scope.group = response;
      });

      $scope.findParticipants();
    };

    $scope.remove = function(item) {
      item.$remove(function(response) {
        $location.path('groups');
      });
    };

    $scope.update = function(item) {
      if (!item.updated) {
        item.updated = [];
      }
      item.updated.push(new Date().getTime());
      item.$update(function() {
        $location.path('groups/' + $stateParams.groupId);
      });
    };
    $scope.findParticipants = function() {
      Participants.query({
        groupId: $stateParams.groupId
      }, function(response) {
        $scope.participants = response;
      });
    };
  }
]);
