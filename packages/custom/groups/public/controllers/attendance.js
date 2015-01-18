'use strict';

angular.module('mean.groups')
.controller('AttendanceController', [
  '$scope',
  '$stateParams',
  '$location',
  'Groups',
  'Schedules',
  'Attendance',
  'Participants',
  function($scope, $stateParams, $location, Groups, Schedules, Attendance, Participants) {

    $scope.init = function() {
      $scope.loadGroup();
      $scope.createSchedule();
    };

    $scope.loadGroup = function() {
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
        $scope.findParticipants();
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
          groupId: $stateParams.groupId,
          scheduleId: $scope.schedule._id,
          participant: participant._id,
          status: status
        });
        value.$save(function(response) {
          participant.attendance = response;
        });
      } else {
        var attendance = participant.attendance;
        attendance.status = status;
        attendance.$update({
          groupId: $stateParams.groupId,
          scheduleId: $scope.schedule._id
        }, function(response) {
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

    $scope.updateSchedule = function() {
      $scope.schedule.status = true;
      $scope.schedule.$update({
        groupId: $stateParams.groupId,
      }, function() {
        $location.path('groups/' + $stateParams.groupId);
      });
    };

    $scope.remove = function() {
      $scope.schedule.$delete({
        groupId: $stateParams.groupId,
      }, function() {
        $location.path('groups/' + $stateParams.groupId);
      });
    };
  }
]);
