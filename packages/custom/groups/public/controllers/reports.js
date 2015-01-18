'use strict';

angular.module('mean.groups')
.controller('ReportsController', [
  '$scope',
  '$stateParams',
  'Reports',
  'Schedules',
  'Participants',
  function(
    $scope, $stateParams, Reports, Schedules, Participants
  ) {

    var groupParams = {
      groupId: $stateParams.groupId
    };

    $scope.groupId = $stateParams.groupId;
    $scope.participants = [];
    $scope.state = {
      ok: 0,
      li: 0,
      no: 0
    };

    $scope.init = function() {
      $scope.findSchedules();
    };

    $scope.buildReport = function() {
      $scope.findParticipants();
      $scope.loadUsersReport();
    };

    $scope.findSchedules = function() {
      Schedules.query(groupParams, function(response) {
        $scope.schedules = response;
        $scope.buildReport();
      });
    };

    $scope.findParticipants = function() {
      Participants.query(groupParams, function(response) {
        $scope.participants = response;
      });
    };

    $scope.loadAttendanceReport = function() {
      Reports.state(groupParams, function(response) {
        console.log(response);
        $scope.attendanceReports = response;
      });
    };

    $scope.loadUsersReport = function() {
      Reports.users(groupParams, function(response) {
        $scope.loadUsersAttendance(response);
      });
    };

    $scope.loadUsersAttendance = function(usersReport) {
      angular.forEach(usersReport, function(report, key) {
        var okStatus = $scope.countStatus(report.status, '10');
        var licenceStatus = $scope.countStatus(report.status, '5');
        var config = {
          ok: okStatus,
          li: licenceStatus,
          no: $scope.schedules.length - okStatus - licenceStatus
        };
        $scope.updateStatus(config);
        $scope.updateParticipant(report._id, config);
      });
    };

    $scope.updateParticipant = function(participantId, config) {
      angular.forEach($scope.participants, function(participant) {
        if (participant._id === participantId) {
          participant.config = config;
        }
      });
    };

    $scope.countStatus = function(statusArray, type) {
      var count = 0;
      angular.forEach(statusArray, function(status) {
        if (status === type) {
          count += 1;
        }
      });
      return count;
    };

    $scope.updateStatus = function(config) {
      $scope.state.ok += config.ok;
      $scope.state.li += config.li;
      $scope.state.no += config.no;
    };
  }
]);
