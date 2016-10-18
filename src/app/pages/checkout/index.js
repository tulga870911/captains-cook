import { OrderPlaceCmt } from './order-place/index';

const CheckOutCmt = {
  templateUrl: 'app/pages/checkout/tpl.html',
  controller: CheckOutCtrl
};

export default angular.module('captainscook.pages.checkout', [])
  .component('checkout', CheckOutCmt)
  .component('orderPlace', OrderPlaceCmt);

function CheckOutCtrl($log, $state, $rootScope, Cart) {
  'ngInject';

  let vm = this;

  vm.items = Cart.getItems();

  vm.goOrderPlace = goOrderPlace;
  vm.increaseQuantity = Cart.increaseQuantity;
  vm.decreaseQuantity = Cart.decreaseQuantity;
  vm.removeItem = Cart.removeItem;
  vm.getTotalAmount = Cart.getTotalAmount;

  function goOrderPlace() {
    $state.go('main.orderplace')
  }

  $rootScope.$on('$destroy', $rootScope.$on('CART_UPDATED', function() {
    vm.items = Cart.getItems();
    $log.log('cart_updated', vm.items);
  }));

  vm.$onInit = function onInit() {
    init()
  }

  function init() {
    // vm.items = [{
    //   id: 1,
    //   url: 'assets/images/carousel-image.png'
    // }, {
    //   id: 2,
    //   url: 'assets/images/carousel-image.png'
    // }, {
    //   id: 3,
    //   url: 'assets/images/carousel-image.png'
    // }];
    vm.rate = 7;
    vm.max = 5;
    vm.isReadonly = true;

    vm.ratingStates = [
      { stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle' },
      { stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty' },
      { stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle' },
      { stateOn: 'glyphicon-heart' },
      { stateOff: 'glyphicon-off' }
    ];
  }
}
