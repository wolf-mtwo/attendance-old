'use strict';

angular.module('mean.groups').controller('ParticipantsController', ['$scope', '$state', '$stateParams', 'Global', 'Participants', 'Attendance', 'Schedules', 'Groups',

	function($scope, $state, $stateParams, Global, Participants, Attendance, Schedules, Groups) {
    $scope.global = Global;

		$scope.init = function() {
		  $scope.loadParticipant();
		  $scope.findSchedules();
			$scope.loadGroup();
		};

		$scope.loadGroup = function() {
			Groups.get({
				groupId: $stateParams.groupId
			}, function(response) {
				$scope.group = response;
			});
		};

    $scope.create = function() {
      var value = new Participants({
        name: this.name,
        email: this.email,
        groupId: $stateParams.groupId
      });
      value.$save(function(response) {
				$state.go('groups', {groupId: $stateParams.groupId});
      });
    };

	 	//TODO has a copy on attendance controller
		$scope.loadParticipant = function() {
			Participants.get({
				groupId: $stateParams.groupId,
				participantId: $stateParams.participantId
			}, function(response) {
				$scope.participant = response;
			});
		};

		$scope.findSchedules = function() {
			Schedules.query({
				groupId: $stateParams.groupId
			}, function(response) {
				$scope.schedules = response;
				$scope.findParticipantAttendances();
			});
		};

		$scope.findParticipantAttendances = function() {
			Participants.attendance({
				groupId: $stateParams.groupId,
				participantId: $stateParams.participantId
			}, function(response) {
				$scope.UpdateView(response);
			});
		};

		$scope.UpdateView = function(attendances) {
			angular.forEach(attendances, function(attendance, key) {
				$scope.Updateschedule(attendance);
			});
			console.log($scope.schedules);
		};

		$scope.Updateschedule = function(attendance) {
			angular.forEach($scope.schedules, function(schedule, key) {
				if (schedule._id === attendance.schedule._id) {
					schedule.attendance = attendance.status;
				}
			});
		};

		// $scope.estaOk = function(estudiante) {
    //         if (!estudiante || estudiante.institucion !== $scope.institucion._id) return false;
    //         return estudiante;
    //     };
		//
    //     $scope.remove = function(estudiante) {
    //         if (estudiante) {
    //             estudiante.$remove();
    //             for (var i in $scope.estudiantes) {
    //                 if ($scope.estudiantes[i] === estudiante) {
    //                     $scope.estudiantes.splice(i, 1);
    //                 }
    //             }
    //         } else {
    //             $scope.estudiante.$remove(function(response) {
    //                 $location.path('institucion/list');
    //             });
    //         }
    //     };
		//
    //     $scope.update = function() {
    //         var estudiante = $scope.estudiante;
    //         if (!estudiante.updated) {
    //             estudiante.updated = [];
    //         }
    //         estudiante.updated.push(new Date().getTime());
    //         estudiante.$update(function() {
    //             $location.path('estudiante/' + estudiante._id);
    //         });
    //     };
		//
    //     $scope.find = function() {
    //     	Participants.query(function(value) {
    //              $scope.estudiantes = value;
    //         });
    //     };
		//
    //     $scope.findbyinst = function() {
    //         Participants.query(function(value) {
    //              $scope.estudiantes = value;
    //         });
    //     };
		//
    //     $scope.findOne = function() {
    //         Participants.get({
    //             estudianteId: $stateParams.estudianteId
    //         }, function(estudiante) {
    //             $scope.estudiante = estudiante;
    //         });
    //     };
    }
]);
