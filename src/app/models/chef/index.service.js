/** @ngInject */
export function ChefService($log, $q, $resource, ServerUrl) {
  return $resource(ServerUrl + '/:id', {id: '@id'}, {
    getFeaturedChefs: {method: 'GET', url: ServerUrl + '/featuredChefs'}
  });
}