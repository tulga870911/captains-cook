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
        $scope.user = {emailId:"khalidmbajwa@gmail.com",password:"wowthing"};
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
