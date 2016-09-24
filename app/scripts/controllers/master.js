'use strict';

/**
 * @ngdoc function
 * @name kaptainkookApp.controller:MasterCtrl
 * @description
 * # MasterCtrl
 * Controller of the kaptainkookApp
 */
angular.module('kaptainkookApp')
  .controller('MasterCtrl', function ($scope,$location) {
   
   $scope.go = function(path)
        {
            $location.path(path);
        };
  });
