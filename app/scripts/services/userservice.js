'use strict';

/**
 * @ngdoc service
 * @name kaptainkookApp.userService
 * @description
 * # userService
 * Service in the kaptainkookApp.
 */
angular.module('kaptainkookApp')
  .service('userService', function userService(configConstants, $http, $cookieStore) 
  {	
    	var apiPrefix = configConstants.apiPrefix + "customers/";
        var userInfo;

        function init()
        {
            var cookieInfo = $cookieStore.get('userInfo')
            if (cookieInfo)
            {
                userInfo = cookieInfo;
            }
        }
        init();
        this.loginUser = function(user)
        {
             return $http.post(configConstants.apiPrefix + "login/", user).then(function(result)
            {
               /*var userData = result.data;
                userInfo = userData;
                $cookieStore.put('userInfo', userData);
                return result.data;*/
                console.log("GOT BACK:",result);

            });
        }
        this.signupUser=function(user)
        {
        	console.log("CALLING SERVICE");
        	 return $http.post(apiPrefix + 'signup', user).then(function(result)
            {
                console.log("GOT BACK:",result);

            });
        }

        this.confirmOTP=function(mobileNumber,otp)
        {
            console.log("CALLING CONFIRM SERVICE");
             return $http.post(apiPrefix + 'signup/confirmation', {"mobileNumber":mobileNumber,"otp":otp}).then(function(result)
            {
                /*var userData = result.data;
                userInfo = userData;
                $cookieStore.put('userInfo', userData);
                return result.data;*/
                console.log("GOT BACK:",result);

            });
        }
        this.getUserInfo = function()
        {
            return userInfo;
        }
        this.isLoggedIn = function()
        {
            if (userInfo)
                return true;
            else
                return false;
        }
        this.logoutUser = function()
        {
            userInfo = null;
            $cookieStore.remove('userInfo')
        }
  });
