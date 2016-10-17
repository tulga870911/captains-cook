/* global moment:false, $ */
import './pages/index.module'
import './common/index.module'
import './models/index.module'
import './components/auth/index.module'

import { Footer } from './components/footer/index';
import { Header } from './components/header/index';
import { SearchCmt } from './components/search/index';
import { config } from './index.config';
import { runBlock } from './index.run';

angular.module('captainscook', [
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ngMessages',
    'ngAria',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'ngMaterial',
    'toastr',
    'captainscook.pages',
    'captainscook.common',
    'captainscook.auth',
    'captainscook.models',
    'pasvaz.bindonce',
    'slick',
    'angular-flexslider'
  ])
  .component('ctFooter', Footer)
  .component('ctHeader', Header)
  .component('ctSearch', SearchCmt)
  .constant('$', $)
  .constant('moment', moment)
  .config(config)
  .run(runBlock)
