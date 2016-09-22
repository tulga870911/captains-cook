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
});
