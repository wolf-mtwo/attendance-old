'use strict';

angular.module('mean.groups').config(['$stateProvider',
    function($stateProvider) {
      var path = 'groups';
      $stateProvider.state('institucion example page', {
        url: '/institucion/example',
        templateUrl: path + '/views/index.html'
      });

      $stateProvider.state('new institucion', {
        url: '/institucion/create',
        templateUrl: path + '/views/create.html'
      });

      $stateProvider.state('list institucion', {
        url: '/institucion/list',
        templateUrl: path + '/views/list.html'
      });

      $stateProvider.state('generator institucion', {
        url: '/institucion/generator',
        templateUrl: path + '/views/listdetail.html'
      });

      $stateProvider.state('chart institucion', {
         url: '/institucion/chart',
        templateUrl: path + '/views/chart.html'
      });

      $stateProvider.state('view institucion', {
        url: '/institucion/:institucionId',
        templateUrl: path + '/views/view.html'
      });

      $stateProvider.state('edit institucion', {
        url: '/institucion/:institucionId/edit',
        templateUrl: path + '/views/edit.html'
      });

      $stateProvider.state('detail institucion', {
         url: '/institucion/:institucionId/detail',
        templateUrl: path + '/views/viewdetail.html'
      });
    }
]);
