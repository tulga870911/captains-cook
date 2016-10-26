/** @ngInject */
export function SignUpCtrl($log, $state, $mdDialog, Auth) {
  let vm = this;

  vm.fnSignup = fnSignup;
  vm.fnConfirmSignup = fnConfirmSignup;
  vm.isOTPStage = Auth.isOTPStage();
  vm.isError = false;
  vm.errMsg = 'Signup failed';

  vm.user = {};
  vm.otpInfo = {};

  function fnSignup() {
    vm.isError = false;

    Auth.registerUser(vm.user).then(res => {
      if (res && res.status == 200 && res.data) {
        var data = res.data;

        if (!data.errorCode) {
          $log.log('Signup Success', res);
          vm.isOTPStage = true;
          Auth.setOTPStage();
        } else if (data.errorCode === 'EMAIL_NOT_AVAILABLE') {
          vm.isError = true;
          vm.errMsg = 'The Email address is not available.';
        } else if (data.errorCode === 'MOBILE_NUMBER_NOT_AVAILABLE') {
          vm.isError = true;
          vm.errMsg = 'The mobile number is not available.';
        }

        $log.log('data', data);
      } else {
        $log.debug('Signup Failed', res);
        vm.isError = true;
        vm.errMsg = '';
      }
    }).catch(error => {
      $log.debug('Signup Failed', error);
      vm.isError = true;
      vm.errMsg = '';
    });

    return false;
  }

  function fnConfirmSignup() {
    vm.isError = false;

    if (vm.isOTPStage)
      vm.user = Auth.getCurrentUser();

    Auth.confirmSignup({
      mobileNumber: vm.user.mobileNumber,
      otp: vm.otpInfo.otp
    }).then(bSuccess => {
      if (bSuccess) {
        $mdDialog.cancel();
      } else {
        vm.isError = true;
        vm.errMsg = 'Failed to confirm the signup';
      }
    }).catch(error => {
      $log.debug('Confirm Signup Failed', error);
      vm.isError = true;
      vm.errMsg = 'Failed to confirm the signup';
    });

    return false;
  }
}
