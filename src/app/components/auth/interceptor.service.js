/** @ngInject */
export function authInterceptor($log, $q, $cookies, $injector, Util) {
  let state;
  return {
    // Add authorization token to headers
    request(config) {
      $log.log('trying to authorize the request...');
      config.headers = config.headers || {};
      if ($cookies.get('token') && Util.isSameOrigin(config.url)) {
        $log.log('authorizing the request...');
        config.headers.Authorization = 'Bearer ' + $cookies.get('token');
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError(response) {
      if (response.status === 401) {
        (state || (state = $injector.get('$state')))
        .go('login');
        // remove any stale tokens
        $cookies.remove('token');
      }
      return $q.reject(response);
    }
  };
}