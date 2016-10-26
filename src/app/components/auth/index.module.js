import '../util/index.module'
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

function authConfig($httpProvider) {
  'ngInject';
  $httpProvider.interceptors.push('authInterceptor');
}
