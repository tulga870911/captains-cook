/** @ngInject */
export function routerDecorator($log, $rootScope, $state, Auth) {
  // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
  $rootScope.$on('$destroy', $rootScope.$on('$stateChangeStart', function(event, next) {
    if (!next.authenticate) {
      return;
    }

    Auth.isLoggedIn(angular.noop)
      .then(is => {
        $log.log('isLoggedIn', is);

        if (is) {
          return;
        }

        event.preventDefault();
        $state.go('main.home');
      });
  }));
}
