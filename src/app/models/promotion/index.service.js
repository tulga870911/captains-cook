/** @ngInject */
export function PromotionService($log, $q, $resource, ServerUrl) {
  return $resource(ServerUrl + '/:id', {id: '@id'}, {
    getPromotions: {method: 'GET', url: ServerUrl + '/promotions'}
  });
}