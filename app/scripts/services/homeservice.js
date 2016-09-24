'use strict';

/**
 * @ngdoc service
 * @name kaptainkookApp.homeService
 * @description
 * # homeService
 * Service in the kaptainkookApp.
 */
angular.module('kaptainkookApp')
  .service('homeService', function homeService($http) 
  {
    
    var apiPrefix = configConstants.apiPrefix;
    this.getPromotions = function()
        {
             return $http.get(configConstants.apiPrefix + "promotions/").then(function(result)
            {
            	return result.data;
            });
        }

        this.getFeaturedChefs = function()
        {
             return $http.get(configConstants.apiPrefix + "featuredChefs/").then(function(result)
            {
            	return result.data;
            });
        }
         this.getFeaturedItems = function()
        {
             return $http.get(configConstants.apiPrefix + "featuredItems/").then(function(result)
            {
            	return result.data;
            });
        }
  });
