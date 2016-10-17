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
function MainCtrl($log, $rootScope, $timeout, Locality) {
  let vm = this;

  vm.localities = [];

  Locality.getLocalities(function(response) {
    if (response && response.data && response.data.subLocs) {
      vm.localities = response.data.subLocs.map(item => {
        return item.loc;
      }).filter((elem, pos, arr) => {
        return pos == arr.indexOf(elem);
      });

      $rootScope.$emit('LOCALITY_LOADED', vm.localities);

      // vm.subLocalities = response.data.subLocs.map(item => {
      //   return item.subLoc;
      // });
    }
  });

  vm.$onInit = function onInit() {}
}
