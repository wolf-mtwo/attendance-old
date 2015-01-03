'use strict';

angular.module('mean.groups').controller('EstudiantesController', ['$scope', '$attrs', '$stateParams', '$location', 'Global', 'Estudiantes',

	function($scope, $attrs, $stateParams, $location, Global, Estudiantes) {
        $scope.global = Global;

        $scope.create = function() {
            var value = new Estudiantes({
                nombre: this.nombre,
                email: this.email,
                institucionId: $scope.institucion._id
            });
            value.$save(function(response) {
                $scope.find();
            });
        };

		$scope.estaOk = function(estudiante) {
            if (!estudiante || estudiante.institucion !== $scope.institucion._id) return false;
            return estudiante;
        };

        $scope.remove = function(estudiante) {
            if (estudiante) {
                estudiante.$remove();
                for (var i in $scope.estudiantes) {
                    if ($scope.estudiantes[i] === estudiante) {
                        $scope.estudiantes.splice(i, 1);
                    }
                }
            } else {
                $scope.estudiante.$remove(function(response) {
                    $location.path('institucion/list');
                });
            }
        };

        $scope.update = function() {
            var estudiante = $scope.estudiante;
            if (!estudiante.updated) {
                estudiante.updated = [];
            }
            estudiante.updated.push(new Date().getTime());
            estudiante.$update(function() {
                $location.path('estudiante/' + estudiante._id);
            });
        };

        $scope.find = function() {
        	Estudiantes.query(function(value) {
                 $scope.estudiantes = value;
            });
        };

        $scope.findbyinst = function() {
            Estudiantes.query(function(value) {
                 $scope.estudiantes = value;
            });
        };

        $scope.findOne = function() {
            Estudiantes.get({
                estudianteId: $stateParams.estudianteId
            }, function(estudiante) {
                $scope.estudiante = estudiante;
            });
        };
    }
]);
