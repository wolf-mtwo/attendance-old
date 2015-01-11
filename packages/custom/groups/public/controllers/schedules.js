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
      $scope.findAttendances();
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
      });
    };
  }
]);
