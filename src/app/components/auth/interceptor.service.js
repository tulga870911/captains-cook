export function authInterceptor($log, $q, $cookies, $injector) {
  'ngInject';
  let state;
  return {
    // Add authorization token to headers
    request(config) {
      // $log.log('Intercept..', config);
      config.headers = config.headers || {};
      // if ($cookies.get('token') && Util.isSameOrigin(config.url)) {
      if ($cookies.get('token')) {
        config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        // $log.log('Authorize..', config);
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