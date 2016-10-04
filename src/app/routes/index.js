import './checkout/index';
import './home/index';
import './listing/index';
import './login/index';
import './results/index';

import { DialogCtrl } from './landing/index';

const MainCmt = {
  templateUrl: 'app/routes/main.html',
  controller: MainCtrl
};

export default angular.module('captainscook.routes', [
    'captainscook.routes.checkout',
    'captainscook.routes.home',
    'captainscook.routes.listing',
    'captainscook.routes.login',
    'captainscook.routes.results'
  ])
  .config(routesConfig)
  .component('main', MainCmt);

/** @ngInject */
function MainCtrl($log, $state, $mdDialog, $document) {
  $log.log('main controller init')
  this.$onInit = function onInit() {
    $state.go('main.home')
    init()
  }

  function init() {
    $mdDialog.show({
      controller: DialogCtrl,
      controllerAs: '$ctrl',
      templateUrl: 'app/routes/landing/tpl.html',
      parent: $document.body,
      clickOutsideToClose: false
    })
  }
}
/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/main');
  $stateProvider
    .state('main', {
      url: '/main',
      template: '<main></main>'
    })
    .state('main.home', {
      url: '/home',
      template: '<home></home>'
    });
}
