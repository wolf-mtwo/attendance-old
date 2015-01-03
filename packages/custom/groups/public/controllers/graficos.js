'use strict';

angular.module('mean.groups').controller('GraficosController', ['$scope', '$http', '$stateParams', '$location', 'Global', 'Institucion', 'Estudiantes',
    function($scope, $http, $stateParams, $location, Global, Institucion, Estudiantes) {
        $scope.global = Global;

        $scope.options =  {
            // Chart.js options can go here.
        };

        $scope.findOne = function() {
            console.log('findOne');
            Estudiantes.get({
                estudianteId: $stateParams.estudianteId
            }, function(estudiante) {
                $scope.estudiante = estudiante;

                $http.post('/horario/institucion', {
                    //estudianteId: estudiante._id
                    institucionId: estudiante.institucion
                }).success(function(data, status, headers, config) {
                    $scope.totalAsistencia = data.length;
                    $scope.update(estudiante);
                });
            });
        };

        $scope.update = function(estudiante) {
            console.log('graficos update');
            $http.post('/horario/estudiante', {
                estudianteId: estudiante._id
            }).success(function(data, status, headers, config) {
                var presente = 0;
                var permiso = 0;
                angular.forEach(data, function(value, key) {
                    if (value.status === 'presente') {
                        presente += 1;
                    }
                    if (value.status === 'permiso') {
                        permiso += 1;
                    }
                });
                estudiante.cantidad = data.length;
                $scope.calcular($scope.totalAsistencia, presente, permiso);
            });
        };

        $scope.calcular = function(total, asistidas, permisos) {
            $scope.data = [
                { value : asistidas, color : '#5cb85c' },
                { value : permisos, color : '#ed9c28' },
                { value : total - asistidas - permisos , color : '#d2322d' }
            ];
        };
    }
]);
