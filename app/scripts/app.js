'use strict';

/**
 * @ngdoc overview
 * @name kaptainkookApp
 * @description
 * # kaptainkookApp
 *
 * Main module of the application.
 */
angular
  .module('kaptainkookApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
.config(function($stateProvider, $urlRouterProvider, $httpProvider)
{

    $urlRouterProvider.otherwise("/home");
    $stateProvider
        .state('home',
        {
            url: "/home",
            templateUrl: "views/home.html",
              controller: "HomeCtrl"
        })
        .state('login',
        {
            url: "/login",
            templateUrl: "views/login.html",
              controller: "LoginCtrl"
        })
        .state('signup',
        {
            url: "/signup",
            templateUrl: "views/signup.html",
              controller: "SignupCtrl"
        })
});
