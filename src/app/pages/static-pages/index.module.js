import { aboutUsCmt } from './about-us/index';
import { customerSupportCmt } from './customer-support/index';
import { faqCmt } from './faq/index';
import { joinUsCmt } from './join-us/index';
import { placesWeServeCmt } from './places-we-serve/index';
import { privacyPolicyCmt } from './privacy-policy/index';
import { qualityControlCmt } from './quality-control/index';
import { termsConditionCmt } from './terms-condition/index';

function routesConfig($stateProvider) {
  'ngInject';
  $stateProvider
    .state('main.about-us', {
      url: '/about-us',
      template: '<static-about-us>',
      authenticate: false
    })
    .state('main.customer-support', {
      url: '/customer-support',
      template: '<static-customer-support>',
      authenticate: false
    })
    .state('main.faq', {
      url: '/faq',
      template: '<static-faq>',
      authenticate: false
    })
    .state('main.join-us', {
      url: '/join-us',
      template: '<static-join-us>',
      authenticate: false
    })
    .state('main.places-serve', {
      url: '/places-serve',
      template: '<static-places-we-serve>',
      authenticate: false
    })
    .state('main.privacy-policy', {
      url: '/privacy-policy',
      template: '<static-privacy-policy>',
      authenticate: false
    })
    .state('main.quality-control', {
      url: '/quality-control',
      template: '<static-quality-control>',
      authenticate: false
    })
    .state('main.terms-condition', {
      url: '/terms-condition',
      template: '<static-terms-condition>',
      authenticate: false
    });
}

export default angular.module('captainscook.pages.static', [])
  .component('staticAboutUs', aboutUsCmt)
  .component('staticCustomerSupport', customerSupportCmt)
  .component('staticFaq', faqCmt)
  .component('staticJoinUs', joinUsCmt)
  .component('staticPlacesWeServe', placesWeServeCmt)
  .component('staticPrivacyPolicy', privacyPolicyCmt)
  .component('staticQualityControl', qualityControlCmt)
  .component('staticTermsCondition', termsConditionCmt)
  .config(routesConfig);
