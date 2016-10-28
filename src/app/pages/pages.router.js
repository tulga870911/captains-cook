/** @ngInject */
export function routerConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/main/home');
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
      template: '<results></results>',
      authenticate: true
    })
    .state('main.details', {
      url: '/details',
      template: '<search-details></search-details>',
      authenticate: true
    })
    .state('main.checkout', {
      url: '/checkout',
      template: '<checkout></checkout>',
      authenticate: true
    })
    .state('main.confirmation', {
      url: '/confirmation',
      template: '<confirmation></confirmation>',
      authenticate: true
    });
}