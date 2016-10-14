/** @ngInject */
export function AuthService($log, $location, $http, $cookies, $q, $rootScope, ServerUrl, Util) {
  let safeCb = Util.safeCb;
  let currentUser = {};

  if ($cookies.get('token') && $location.path() !== '/logout') {
    // currentUser = User.get();
  }

  let Auth = {

    /**
     * Authenticate user and save token
     *
     * @param  {Object}   user     - login info
     * @param  {Function} callback - optional, function(error, user)
     * @return {Promise}
     */
    login({ email, password, device_token }, callback) {
      return $http.post(ServerUrl + '/login', {
          emailId: email,
          password: password,
          deviceToken: device_token
        }, {
          transformRequest: Util.transformRequest
        })
        .then(res => {
          $log.log('login response', res);

          let bSuccess = false;

          if (res && res.status == 200 && res.data) {
            currentUser = res.data.data;

            $rootScope.$emit('USER_UPDATED', currentUser);

            $cookies.put('token', currentUser.token);

            bSuccess = true;
          }

          safeCb(callback)(null, bSuccess);
          return bSuccess;
        })
        .catch(err => {
          Auth.logout();
          safeCb(callback)(err);
          return $q.reject(err);
        });
    },

    /**
     * Delete access token and user info
     */
    logout() {
      $cookies.remove('token');
      currentUser = {};
    },

    /**
     * Create a new user
     *
     * @param  {Object}   user     - user info
     * @param  {Function} callback - optional, function(error, user)
     * @return {Promise}
     */
    registerUser(user, callback) {
      return $http.put(ServerUrl + '/customers/signup/validation', {
          emailId: user.emailId
        }, {
          transformRequest: Util.transformRequest
        })
        .then(res => {
          if (res && res.status === 200) {
            return $http.post(ServerUrl + '/customers/signup', user, {
              transformRequest: Util.transformRequest
            });
          } else {
            return $q.reject(res);
          }
        })
        .then(res => {
          safeCb(callback)(null, res);
          return res;
        })
        .catch(err => {
          Auth.logout();
          safeCb(callback)(err);
          return $q.reject(err);
        });
    },

    /**
     * Create a new user
     *
     * @param  {Object}   user     - user info
     * @param  {Function} callback - optional, function(error, user)
     * @return {Promise}
     */
    confirmSignup({ mobileNumber, otp }, callback) {
      return $http.put(ServerUrl + '/customers/signup/confirmation', {
          mobileNumber: parseInt(mobileNumber),
          otp: otp
        }, {
          transformRequest: Util.transformRequest
        })
        .then(res => {
          let bSuccess = false;

          if (res && res.status == 200 && res.data) {
            currentUser = res.data.data;

            $cookies.put('token', currentUser.token);

            bSuccess = true;
          }

          safeCb(callback)(null, bSuccess);
          return bSuccess;
        })
        .catch(err => {
          Auth.logout();
          safeCb(callback)(err);
          return $q.reject(err);
        });
    },

    /**
     * Gets all available info on a user
     *   (synchronous|asynchronous)
     *
     * @param  {Function|*} callback - optional, funciton(user)
     * @return {Object|Promise}
     */
    getCurrentUser(callback) {
      if (arguments.length === 0) {
        return currentUser;
      }

      safeCb(callback)(currentUser);
      return currentUser;
    },

    /**
     * Check if a user is logged in
     *   (synchronous|asynchronous)
     *
     * @param  {Function|*} callback - optional, function(is)
     * @return {Bool|Promise}
     */
    isLoggedIn(callback) {
      const is = currentUser && currentUser.customerId ? true : false;
      
      if (arguments.length === 0) {
        return is;
      }

      safeCb(callback)(is);
      return is;
      // return Auth.getCurrentUser(null)
      //   .then(user => {
      //     let is = user && user.customerId ? true : false;
      //     safeCb(callback)(is);
      //     return is;
      //   });
    },

    /**
     * Get auth token
     *
     * @return {String} - a token string used for authenticating
     */
    getToken() {
      return $cookies.get('token');
    }
  };

  return Auth;
}
