/** @ngInject */
export function LocalityService($log, $q, $resource, ServerUrl) {
  return $resource(ServerUrl + '/:id', {id: '@id'}, {
    getLocalities: {method: 'GET', url: ServerUrl + '/items/searchCriteria'}
  });
}