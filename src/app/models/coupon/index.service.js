/** @ngInject */
export function CouponService($log, $q, $resource, ServerUrl, Cart) {
  return $resource(ServerUrl + '/:id', {id: '@id'}, {
    applyCoupon: {method: 'PUT', url: ServerUrl + '/consumers/:id/applycoupon'}
  });
}