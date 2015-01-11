'use strict';
angular.module('mean.groups').controller('AttendanceController', ['$scope', '$stateParams', '$location', 'Global', 'Groups', 'Schedules', 'Attendance', 'Participants',
  function($scope, $stateParams, $location, Global, Groups, Schedules, Attendance, Participants) {
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
        group: $stateParams.groupId
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
    // Status = 2 attended, 1 permission, 0 fail
    $scope.changeStatus = function(participant, status) {
      if (!participant.attendance) {
        var value = new Attendance({
          group: $stateParams.groupId,
          schedule: $scope.schedule._id,
          participant: participant._id,
          status: status
        });
        value.$save(function(response) {
          participant.attendance = response;
        });
      } else {
        var attendance = participant.attendance;
        attendance.status = status;
        attendance.$update(function(response) {
          console.log(response);
        });
      }
    };

    $scope.verify = function(participant) {
      if (participant.attendance) {
        return participant.attendance.status;
      }
      return undefined;
    };

    $scope.remove = function() {
      $scope.schedule.$delete(function() {
        $location.path('groups/' + $stateParams.groupId);
      });
    };
  }
]);
