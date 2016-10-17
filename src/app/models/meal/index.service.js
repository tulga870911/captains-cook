/** @ngInject */
export function MealService($log, $q, $resource, ServerUrl) {
  return $resource(ServerUrl + '/:id', {id: '@id'}, {
    getFeaturedMeals: {method: 'GET', url: ServerUrl + '/featuredItems'}
  });
}