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
    'ngMaterial',
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
  let vm = this;
  
  vm.$onInit = function onInit() {
    init();
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
    })
    .state('main.results', {
      url: '/results',
      template: '<results></results>'
    })
    .state('main.list', {
      url: '/list',
      template: '<list></list>'
    })
    .state('main.checkout', {
      url: '/checkout',
      template: '<checkout></checkout>'
    })
    .state('main.orderplace', {
      url: '/orderplace',
      template: '<order-place></order-place>'
    });
}
