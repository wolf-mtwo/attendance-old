'use strict';

angular.module('mean.groups').controller('ParticipantController', ['$scope', '$attrs', '$stateParams', '$location', 'Global', 'Participants',

	function($scope, $attrs, $stateParams, $location, Global, Participants) {
        $scope.global = Global;

        $scope.create = function() {
            var value = new Participants({
                name: this.name,
                email: this.email,
                groupId: $stateParams.groupId
            });
            value.$save(function(response) {
							$location.path('groups/' + $stateParams.groupId);
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
