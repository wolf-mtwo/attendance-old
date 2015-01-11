'use strict';
angular.module('mean.groups').controller('AttendanceController', ['$scope', '$stateParams', '$location', 'Global', 'Groups', 'Schedules', 'Participants',
  function($scope, $stateParams, $location, Global, Groups, Schedules, Participants) {
    $scope.global = Global;

    $scope.init = function() {
      $scope.findGroup();
      $scope.createSchedule();
      $scope.findParticipants();
    };

    $scope.findGroup = function() {
      Groups.get({
        groupId: $stateParams.groupId
      }, function(response) {
        $scope.group = response;
      });
    };

    $scope.createSchedule = function() {
      var value = new Schedules({
        groupId: $stateParams.groupId
      });
      value.$save(function(response) {
        $scope.schedule = response;
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
