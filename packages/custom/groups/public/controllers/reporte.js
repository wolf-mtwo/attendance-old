'use strict';

angular.module('mean.groups').controller('ReporteController', ['$scope', '$http', '$stateParams', '$location', 'Global', 'Institucion', 'Estudiantes',
    function($scope, $http, $stateParams, $location, Global, Institucion, Estudiantes) {
        $scope.global = Global;
        $scope.actuales = [];

        $scope.find = function() {
            Institucion.query(function(value) {
                 $scope.instituciones = value;
            });
        };

        $scope.findOne = function() {
            Institucion.get({
                institucionId: $stateParams.institucionId
            }, function(institucion) {
                //$scope.global.institucion = institucion;
                $scope.institucion = institucion;
            });
        };

        $scope.estaOk2 = function(estudiante) {
            if (!estudiante || estudiante.institucion !== $scope.institucion._id) return false;
            return estudiante;
        };

        $scope.update = function(estudiante) {
            $http.post('/horario/estudiante', {
                estudianteId: estudiante._id
            }).success(function(data, status, headers, config) {
                estudiante.cantidad = data.length;
                estudiante.presente = 0;
                estudiante.permiso = 0;
                angular.forEach(data, function(value, key) {
                    if (value.status === 'presente') {
                        estudiante.presente += 1;
                    }
                    if (value.status === 'permiso') {
                        estudiante.permiso += 1;
                    }
                });

            });
        };

        $scope.findestudiantes = function() {
            Institucion.get({
                institucionId: $stateParams.institucionId
            }, function(data) {
                $scope.institucion = data;
            });

            $http.post('/horario/institucion', {
                //estudianteId: estudiante._id
                institucionId: $stateParams.institucionId
            }).success(function(data, status, headers, config) {
                $scope.cantidad = data.length;
            });

            $http.get('/estudiante/' + $stateParams.institucionId + '/institucion').success(function(data, status, headers, config) {
                $scope.estudiantes = data;
                angular.forEach(data, function(value, key) {
                    $scope.update(value);
                });
            });
        };
    }
]);
