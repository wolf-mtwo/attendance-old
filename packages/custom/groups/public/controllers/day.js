'use strict';

angular.module('mean.groups').controller('DayController', ['$scope', '$http', '$stateParams', '$location', 'Global', 'Institucion', 'Estudiantes',
    function($scope, $http, $stateParams, $location, Global, Institucion, Estudiantes) {
        $scope.global = Global;

        $scope.find = function() {
            Institucion.get({
                institucionId: $stateParams.institucionId
            }, function(institucion) {
                //$scope.global.institucion = institucion;
                $scope.institucion = institucion;
            });
            $http.get('/day/' + $stateParams.institucionId + '/institucion').success(function(data, status, headers, config) {
                $scope.days = data;
            });
        };



        $scope.change = function(estudiante, status) {
            if (estudiante.status === undefined) {
                if (status !== undefined) {
                    $http.post('/horario', {
                        estudianteId: estudiante._id,
                        dayId: $stateParams.dayId,
                        status: status
                    }).success(function(data, status, headers, config) {
                        estudiante.status = data.status;
                    });
                }
            } else {
                if (status !== undefined) {
                    //app.put('/horario/:horarioId', controller.update);
                    $http.put('/horario/' + estudiante.horario._id, {
                        estudianteId: estudiante._id,
                        dayId: $stateParams.dayId,
                        status: status
                    }).success(function(data, status, headers, config) {
                        estudiante.status = data.status;
                    });
                } else {
                    $http.delete('/horario/' + estudiante.horario._id, {
                        estudianteId: estudiante._id,
                        dayId: $stateParams.dayId,
                        status: status
                    }).success(function(data, status, headers, config) {
                        estudiante.status = undefined;
                        estudiante.horario = undefined;
                    });
                }
            }
        };



        $scope.findreport = function() {
            $http.get('/day/' + $stateParams.dayId).success(function(data, status, headers, config) {
                $scope.day = data;
            });

            $http.post('/horario/day', {
                dayId: $stateParams.dayId
            }).success(function(data, status, headers, config) {
                //registrados
                $scope.registered = data;

                $http.get('/estudiante/' + $stateParams.institucionId + '/institucion').success(function(data, status, headers, config) {

                    angular.forEach(data, function(value, key) {
                        angular.forEach($scope.registered, function(valueregistered, key) {
                            if (value._id === valueregistered.estudiante) {

                                value.status = valueregistered.status;
                                value.horario = valueregistered;
                            }
                        });
                    });
                    $scope.estudiantes = data;
                });
            });

            Institucion.get({
                institucionId: $stateParams.institucionId
            }, function(data) {
                $scope.institucion = data;
            });


        };
    }
]);
