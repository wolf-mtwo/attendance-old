'use strict';

angular.module('mean.groups').config(['$stateProvider',
    function($stateProvider) {
      var path = 'groups';
      $stateProvider.state('index reporte', {
        url: '/reporte',
        templateUrl: path + '/views/reporte/index.html'
      });

      $stateProvider.state('tabla reporte', {
        url: '/reporte/:institucionId/tabla',
        templateUrl: path + '/views/reporte/tabla.html'
      });

      $stateProvider.state('day reporte', {
        url: '/day/:institucionId',
        templateUrl: path + '/views/reporte/day.html'
      });

      $stateProvider.state('day report reporte', {
        url: '/day/:institucionId/report/:dayId',
        templateUrl: path + '/views/reporte/report.html'
      });
    }
]);
