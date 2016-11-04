import { SignInCtrl } from '../../pages/login/signin/index';
import { SignUpCtrl } from '../../pages/login/signup/index';

export const Header = {
  templateUrl: 'app/components/header/tpl.html',
  controller: HeaderCtrl
};

/** @ngInject */
function HeaderCtrl($log, $mdDialog, $document, $state, $rootScope, Auth, Cart) {
  let vm = this;
  vm.$onInit = function onInit() {

  }
  vm.showSignIn = showSignIn;
  vm.showSignUp = showSignUp;
  vm.isSearchVisible = isSearchVisible;
  vm.goHome = goHome;
  vm.goToCheckout = goToCheckout;
  
  vm.isLoggedIn = Auth.isLoggedIn;
  vm.logout = logout;
  vm.currentUser = Auth.getCurrentUser();
  vm.cart = {
    count: Cart.getCount()
  };

  $rootScope.$on('$destroy', $rootScope.$on('USER_UPDATED', function(event, data) {
    vm.currentUser = data;
  }));

  $rootScope.$on('$destroy', $rootScope.$on('CART_UPDATED', function() {
    vm.cart.count = Cart.getCount();
  }));

  function goHome() {
    $state.go('main.home');
  }

  function goToCheckout() {
    $state.go('main.checkout');
  }

  function logout() {
    Auth.logout();
    $state.go('main.home');
  }

  function isSearchVisible() {
    let stateName = $state.current.name;
    if (stateName == 'main.results' || stateName == 'main.details') {
      return true;
    } else {
      return false;
    }
  }

  function showSignIn() {
    $mdDialog.show({
      controller: SignInCtrl,
      controllerAs: '$ctrl',
      templateUrl: 'app/pages/login/signin/tpl.html',
      parent: $document.body,
      clickOutsideToClose: true
    })
  }

  function showSignUp() {
    $mdDialog.show({
      controller: SignUpCtrl,
      controllerAs: '$ctrl',
      templateUrl: 'app/pages/login/signup/tpl.html',
      parent: $document.body,
      clickOutsideToClose: true
    })
  }
}
