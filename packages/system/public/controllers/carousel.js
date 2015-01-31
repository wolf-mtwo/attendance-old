'use strict';

angular.module('mean.system')
.controller('CarouselDemoCtrl', [
  '$scope',
  '$rootScope',

  function($scope, $rootScope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    var images = ['att', 'group', 'participants', 'report', 'reportbyday'];
    $scope.addSlide = function() {
      for (var i in images) {
        slides.push({
          image: '/system/assets/img/att/'+images[i] + '.png'
        });
      }
    };
    $scope.addSlide();
  }
]);
