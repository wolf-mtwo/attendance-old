'use strict';
angular.module('mean.groups').controller('AttendanceController', ['$scope', '$stateParams', '$location', 'Global', 'Groups', 'Days', 'Participants',
  function($scope, $stateParams, $location, Global, Groups, Days, Participants) {
    $scope.global = Global;

    $scope.init = function() {
      $scope.findGroup();
      $scope.createDay();
      $scope.findParticipants();
    };

    $scope.findGroup = function() {
      Groups.get({
        groupId: $stateParams.groupId
      }, function(response) {
        $scope.group = response;
      });
    };

    $scope.createDay = function() {
      var value = new Days({
        groupId: $stateParams.groupId
      });
      value.$save(function(response) {
        $scope.day = response;
      });
    };

    $scope.findParticipants = function() {
      Participants.query({
        groupId: $stateParams.groupId
      }, function(response) {
        $scope.participants = response;
      });
    };

    // Take attendance
    $scope.changeStatus = function(participant, status) {
      participant.status = status;
    };
  }
]);
