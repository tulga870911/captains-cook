import './checkout/index';
import './home/index';
import './listing/index';
import './login/index';
import './results/index';

import { routerConfig } from './pages.router';

const MainCmt = {
  templateUrl: 'app/pages/main.html',
  controller: MainCtrl
};

export default angular.module('captainscook.pages', [
    'ngMaterial',
    'captainscook.pages.checkout',
    'captainscook.pages.home',
    'captainscook.pages.listing',
    'captainscook.pages.login',
    'captainscook.pages.results'
  ])
  .config(routerConfig)
  .component('main', MainCmt);

/** @ngInject */
function MainCtrl() {
  let vm = this;
  
  vm.$onInit = function onInit() {
  }
}

