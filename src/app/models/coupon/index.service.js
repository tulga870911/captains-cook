/** @ngInject */
export function CouponService($log, $q, $resource, ServerUrl, Cart) {
  return $resource(ServerUrl + '/:consumerId', {consumerId: '@consumerId'}, {
    applyCoupon: {method: 'PUT', url: ServerUrl + '/consumers/:consumerId/applycoupon'}
  });
}