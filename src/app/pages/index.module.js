import './checkout/index';
import './home/index';
import './details/index';
import './login/index';
import './results/index';

import { routerConfig } from './pages.router';
import { MainCtrl } from './main.ctrl';

const MainCmt = {
  templateUrl: 'app/pages/main.html',
  controller: MainCtrl
};

export default angular.module('captainscook.pages', [
    'ngMaterial',
    'captainscook.pages.checkout',
    'captainscook.pages.home',
    'captainscook.pages.details',
    'captainscook.pages.login',
    'captainscook.pages.results'
  ])
  .config(routerConfig)
  .component('main', MainCmt);