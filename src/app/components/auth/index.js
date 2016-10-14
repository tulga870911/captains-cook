import '../util/index'
import { AuthService } from './auth.service';
import { authInterceptor } from './interceptor.service';
import { routerDecorator } from './router.decorator';

export default angular.module('captainscook.auth', [
    'captainscook.util', 'ui.router'
  ])
  .config(authConfig)
  .factory('Auth', AuthService)
  .factory('authInterceptor', authInterceptor)
  .run(routerDecorator);

/** @ngInject */
function authConfig($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
}