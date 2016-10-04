import { SignInCtrl } from '../../routes/login/signin/index';
import { SignUpCtrl } from '../../routes/login/signup/index';

export const Header = {
  templateUrl: 'app/components/header/tpl.html',
  controller: HeaderCtrl
};

/** @ngInject */
function HeaderCtrl($log, $mdDialog, $document) {
  $log.log('header ctrl');
  var vm = this;
  vm.$onInit = function onInit() {

  }
  vm.signin = signin;
  vm.signup = signup;

  function signin() {
    $mdDialog.show({
      controller: SignInCtrl,
      controllerAs: '$ctrl',
      templateUrl: 'app/routes/login/signin/tpl.html',
      parent: $document.body,
      clickOutsideToClose: true
    })
  }

  function signup() {
    $mdDialog.show({
      controller: SignUpCtrl,
      controllerAs: '$ctrl',
      templateUrl: 'app/routes/login/signup/tpl.html',
      parent: $document.body,
      clickOutsideToClose: true
    })
  }
}
