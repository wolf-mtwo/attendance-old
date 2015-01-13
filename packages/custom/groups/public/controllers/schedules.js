'use strict';
angular.module('mean.groups').controller('SchedulesController', ['$scope', '$stateParams', '$location', 'Global', 'Groups', 'Schedules', 'Attendance', 'Participants',
  function($scope, $stateParams, $location, Global, Groups, Schedules, Attendance, Participants) {
    $scope.global = Global;

    $scope.init = function() {
      $scope.findSchedules();
      $scope.loadGroup();
    };

    $scope.initList = function() {
      $scope.loadGroup();
      $scope.loadSchedule();
      $scope.findParticipants();
      $scope.findAttendances();
    };

    $scope.findParticipants = function() {
      Participants.query({
        groupId: $stateParams.groupId
      }, function(response) {
        $scope.participants = response;
      });
    };

    $scope.findSchedules = function() {
      Schedules.query({
        groupId: $stateParams.groupId
      }, function(response) {
        $scope.schedules = response;
      });
    };

    $scope.loadGroup = function() {
      Groups.get({
        groupId: $stateParams.groupId
      }, function(response) {
        $scope.group = response;
      });
    };

    $scope.loadSchedule = function() {
      Schedules.get({
        scheduleId: $stateParams.scheduleId,
        groupId: $stateParams.groupId
      }, function(response) {
        $scope.schedule = response;
      });
    };

    $scope.findAttendances = function() {
      var query = {
        groupId: $stateParams.groupId,
        scheduleId: $stateParams.scheduleId
      };
      Attendance.query(query, function(response) {
        $scope.attendances = response;
        $scope.loadParticpantsAtt();
      });
    };

    $scope.loadParticpantsAtt = function() {
      var participants = $scope.participants;
      for (var i in participants) {
        if (participants[i]._id) {
          var attendance = $scope.selectAttEvent(participants[i]._id);
          participants[i].attendance = attendance;
        }
      }
    };

    $scope.selectAttEvent = function(participantId) {
      if (!participantId) {
        throw new Error('participantId is not defined');
      }
      var attendances = $scope.attendances;
      for (var i in attendances) {
        if (attendances[i]._id) {
          if (attendances[i].participant._id === participantId) {
            return attendances[i];
          }
        }
      }
      return null;
    };

    // TODO there is a copy on attendance controller
    // Take attendance
    // Status = 10 attended, 5 permission, 0 fail
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
  }
]);
