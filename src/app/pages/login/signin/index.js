/** @ngInject */
export function SignInCtrl($log, $mdDialog, Auth) {
  let vm = this;

  vm.fnLogin = fnLogin;

  function fnLogin() {
    Auth.login({
      email: vm.user.email,
      password: vm.user.password,
      device_token: ''
    }).then(bSuccess => {
      if (bSuccess) {
        $mdDialog.cancel();
      } else {
        vm.isError = true;
      }
    }).catch(error => {
      $log.debug('Login Failed', error);
      vm.isError = true;
    });
    return false;
  }
}
