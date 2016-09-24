'use strict';

/**
 * @ngdoc function
 * @name kaptainkookApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the kaptainkookApp
 */
angular.module('kaptainkookApp')
  .controller('HeaderCtrl', function ($scope,userService) 
  {
	   	$scope.logout=function()
	 	{
	 		userService.logoutUser();
	 		console.log("LOGGING OUT");
	 		$scope.go("/login");
	 	}
	 	$scope.isLoggedIn=function()
	 	{
	 		//console.log("INFO:",userService.getUserInfo())
	 		if(userService.getUserInfo())
	 			return true;
	 		else
	 			return false; 
	 	}
  });
