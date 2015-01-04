'use strict';

// angular.module('mean.groups').controller('InstitucionController', ['$scope', '$http', '$stateParams', '$location', 'Global', 'Institucion', 'Participants',
// function($scope, $http, $stateParams, $location, Global, Institucion, Participants) {

// angular.module('mean.groups').controller('GroupsController', ['$scope', 'Global', 'Groups',
//   function($scope, Global, Groups) {
angular.module('mean.groups').controller('GroupsController', ['$scope', '$http', '$stateParams', '$location', 'Global', 'Groups', 'Participants',
  function($scope, $http, $stateParams, $location, Global, Groups, Participants) {
    // $scope.global = Global;
    // $scope.package = {
    //   name: 'groups'
    // };

    $scope.global = Global;
    $scope.actuales = [];
    $scope.group = {};

    $scope.find = function() {
      Groups.query(function(value) {
        $scope.groups = value;
      });
    };

    $scope.create = function() {
      var value = new Groups({
        title: this.title,
        content: this.content
      });
      value.$save(function(response) {
        $location.path('groups');
        // $location.path('institucion/' + response._id);
      });
    };

    $scope.findOne = function() {
      Groups.get({
        groupId: $stateParams.groupId
      }, function(response) {
        $scope.group = response;
      });

      Participants.query({
        groupId: $stateParams.groupId
      }, function(response) {
        $scope.participants = response;
      });
    };

    $scope.remove = function(item) {
      item.$remove(function(response) {
        $location.path('groups');
      });
    };

    $scope.update = function(item) {
      if (!item.updated) {
        item.updated = [];
      }
      item.updated.push(new Date().getTime());
      item.$update(function() {
        $location.path('groups/' + $stateParams.groupId);
      });
    };





    //
    // $scope.llamarlista = function() {
    //   $http.post('/day', {
    //     institucionId: $stateParams.institucionId
    //   }).
    //   success(function(data, status, headers, config) {
    //     angular.forEach($scope.actuales, function(value, key) {
    //       $http.post('/horario', {
    //         estudianteId: value._id,
    //         dayId: data._id,
    //         status: value.status
    //       }).success(function(data, status, headers, config) {
    //         $location.path('reporte/' + $stateParams.institucionId + '/tabla');
    //       });
    //     });
    //   });
    // };
    //
    //
    //
    //
    //
    // $scope.estaOk2 = function(estudiante) {
    //   if (!estudiante || estudiante.institucion !== $scope.institucion._id) return false;
    //   return estudiante;
    // };
    //
    // $scope.presente = function(estudiante) {
    //   for (var i in $scope.estudiantes) {
    //     if ($scope.estudiantes[i] === estudiante) {
    //       $scope.estudiantes.splice(i, 1);
    //     }
    //   }
    //   estudiante.status = 'presente';
    //   $scope.actuales.push(estudiante);
    // };
    //
    // $scope.permiso = function(estudiante) {
    //   for (var i in $scope.estudiantes) {
    //     if ($scope.estudiantes[i] === estudiante) {
    //       $scope.estudiantes.splice(i, 1);
    //     }
    //   }
    //   estudiante.status = 'permiso';
    //   $scope.actuales.push(estudiante);
    //   console.log('permiso');
    // };
    //
    // $scope.fin = function(estudiante) {
    //   for (var i in $scope.estudiantes) {
    //     if ($scope.estudiantes[i] === estudiante) {
    //       $scope.estudiantes.splice(i, 1);
    //     }
    //   }
    //   estudiante.status = 'fin';
    //   $scope.estudiantes.push(estudiante);
    //   console.log('fin');
    // };
    //
    // $scope.falta = function(estudiante) {
    //   $scope.estudiantes.push(estudiante);
    //   for (var i in $scope.actuales) {
    //     if ($scope.actuales[i] === estudiante) {
    //       $scope.actuales.splice(i, 1);
    //     }
    //   }
    //   console.log('falta');
    // };
    //
    // /* vista en detalle listo para llamar lista*/
    // $scope.findOneByestudents = function() {
    //   Groups.get({
    //     institucionId: $stateParams.institucionId
    //   }, function(institucion) {
    //     $scope.institucion = institucion;
    //     Participants.query(function(value) {
    //       $scope.estudiantes = value;
    //     });
    //   });
    // };
  }
]);
