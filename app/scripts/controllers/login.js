'use strict';

/**
 * @ngdoc function
 * @name kaptainkookApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the kaptainkookApp
 */
angular.module('kaptainkookApp')
  .controller('LoginCtrl', function ($scope,userService) {
        $scope.user = {emailId:"consumer2@gmail.com",password:"password"};
        $scope.loginUser = function()
        {
           userService.loginUser($scope.user).then(function(data)
            {
                $scope.go("/home");
            },
            function(errorMessage) {

            })
        }
  });
