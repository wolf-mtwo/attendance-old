'use strict';

angular.module('mean.groups').controller('InstitucionController', ['$scope', '$http', '$stateParams', '$location', 'Global', 'Institucion', 'Estudiantes',
    function($scope, $http, $stateParams, $location, Global, Institucion, Estudiantes) {
        $scope.global = Global;
        $scope.actuales = [];

        $scope.create = function() {
            var value = new Institucion({
                title: this.title,
                content: this.content
            });
            value.$save(function(response) {
                $location.path('institucion/' + response._id);
            });
        };

        $scope.llamarlista = function() {
            $http.post('/day', {
                institucionId: $stateParams.institucionId
            }).
            success(function(data, status, headers, config) {
                angular.forEach($scope.actuales, function(value, key) {
                    $http.post('/horario', {
                        estudianteId: value._id,
                        dayId: data._id,
                        status: value.status
                    }).success(function(data, status, headers, config) {
                        $location.path('reporte/' + $stateParams.institucionId + '/tabla');
                    });
                });
            });
        };

        $scope.remove = function(item) {
            if (item) {
                item.$remove();
                for (var i in $scope.instituciones) {
                    if ($scope.instituciones[i] === item) {
                        $scope.instituciones.splice(i, 1);
                        console.log('general malito');
                    }
                }
            } else {
                $scope.item.$remove(function(response) {
                    $location.path('institucion/list');
                });
            }
        };

        $scope.update = function() {
            var institucion = $scope.institucion;
            if (!institucion.updated) {
                institucion.updated = [];
            }
            institucion.updated.push(new Date().getTime());
            institucion.$update(function() {
                $location.path('institucion/' + institucion._id);
            });
        };

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

        $scope.presente = function(estudiante) {
            for (var i in $scope.estudiantes) {
                if ($scope.estudiantes[i] === estudiante) {
                    $scope.estudiantes.splice(i, 1);
                }
            }
            estudiante.status = 'presente';
            $scope.actuales.push(estudiante);
        };

        $scope.permiso = function(estudiante) {
            for (var i in $scope.estudiantes) {
                if ($scope.estudiantes[i] === estudiante) {
                    $scope.estudiantes.splice(i, 1);
                }
            }
            estudiante.status = 'permiso';
            $scope.actuales.push(estudiante);
            console.log('permiso');
        };

        $scope.fin = function(estudiante) {
           for (var i in $scope.estudiantes) {
                if ($scope.estudiantes[i] === estudiante) {
                    $scope.estudiantes.splice(i, 1);
                }
            }
            estudiante.status = 'fin';
            $scope.estudiantes.push(estudiante);
            console.log('fin');
        };

        $scope.falta = function(estudiante) {
            $scope.estudiantes.push(estudiante);
            for (var i in $scope.actuales) {
                if ($scope.actuales[i] === estudiante) {
                    $scope.actuales.splice(i, 1);
                }
            }
            console.log('falta');
        };

        /* vista en detalle listo para llamar lista*/
        $scope.findOneByestudents = function() {
            Institucion.get({
                institucionId: $stateParams.institucionId
            }, function(institucion) {
                $scope.institucion = institucion;
                Estudiantes.query(function(value) {
                     $scope.estudiantes = value;
                });
            });
        };
    }
]);
