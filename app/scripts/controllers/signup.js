'use strict';

/**
 * @ngdoc function
 * @name kaptainkookApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the kaptainkookApp
 */
angular.module('kaptainkookApp')
  .controller('SignupCtrl', function ($scope,userService)
  {

        $scope.user = {name:"consumer 2",emailId:"consumer2@gmail.com",password:"password",mobileNumber:"4444477777"};
        $scope.otpInfo={otp:"2222"}
        $scope.isOTPStage=false;
        $scope.signupUser = function()
        {
                userService.signupUser($scope.user).then(function(data)
                {
                    //$scope.go("/home");
                    $scope.isOTPStage=true;
                },
                function(errorMessage) {

                });

        }

        $scope.confirmOTP=function()
        {
        	userService.confirmOTP($scope.user.mobileNumber,$scope.otpInfo.otp).then(function(data)
            {
                $scope.go("/home");
            },
            function(errorMessage) {

            });
        }
  });
