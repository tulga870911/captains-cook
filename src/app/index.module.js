/* global malarkey:false, moment:false */
import './routes/index'

import { Footer } from './components/footer/index';
import { Header } from './components/header/index';
import { config } from './index.config';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';

angular.module('captainscook', [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngMessages',
    'ngAria',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'ngMaterial',
    'toastr',
    'captainscook.routes',
    'pasvaz.bindonce'
  ])
  .component('ctFooter', Footer)
  .component('ctHeader', Header)
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .run(runBlock)
  .controller('MainController', MainController)
