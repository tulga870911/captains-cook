import { OrderPlaceCmt } from './order-place/index';

const CheckOutCmt = {
  templateUrl: 'app/pages/checkout/tpl.html',
  controller: CheckOutCtrl
};

export default angular.module('captainscook.pages.checkout', [])
  .component('checkout', CheckOutCmt)
  .component('orderPlace', OrderPlaceCmt);

function CheckOutCtrl($state) {
  'ngInject';
  let vm = this;
  vm.goOrderPlace = goOrderPlace;

  function goOrderPlace() {
    $state.go('main.orderplace')
  }
  vm.$onInit = function onInit() {
    init()
  }

  function init() {
    vm.items = [{
      id: 1,
      url: 'assets/images/carousel-image.png'
    }, {
      id: 2,
      url: 'assets/images/carousel-image.png'
    }, {
      id: 3,
      url: 'assets/images/carousel-image.png'
    }];
    vm.rate = 7;
    vm.max = 5;
    vm.isReadonly = false;

    vm.hoveringOver = function(value) {
      vm.overStar = value;
      vm.percent = 100 * (value / vm.max);
    };

    vm.ratingStates = [
      { stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle' },
      { stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty' },
      { stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle' },
      { stateOn: 'glyphicon-heart' },
      { stateOff: 'glyphicon-off' }
    ];
  }
}
