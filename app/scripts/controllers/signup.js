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
   
        $scope.user = {name:"Khalid Bajwa",emailId:"khalidmbajwa@gmail.com",password:"wowthing",mobileNumber:"03015476287"};
        $scope.otpInfo={otp:"4444"}
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
