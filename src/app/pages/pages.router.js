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
    .state('main.list', {
      url: '/list',
      template: '<list></list>',
      authenticate: true
    })
    .state('main.checkout', {
      url: '/checkout',
      template: '<checkout></checkout>',
      authenticate: true
    })
    .state('main.orderplace', {
      url: '/orderplace',
      template: '<order-place></order-place>',
      authenticate: true
    });
}