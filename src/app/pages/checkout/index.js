import { ConfirmationCmt } from './confirmation/index';
import { LocalityCtrl } from './locality/index';

const CheckOutCmt = {
  templateUrl: 'app/pages/checkout/tpl.html',
  controller: CheckOutCtrl
};

export default angular.module('captainscook.pages.checkout', [])
  .component('checkout', CheckOutCmt)
  .component('confirmation', ConfirmationCmt);

function CheckOutCtrl($log, $state, $scope, $rootScope, Cart, Coupon, Auth, $mdDialog, $document) {
  'ngInject';

  let vm = this;

  vm.items = Cart.getItems();

  vm.increaseQuantity = increaseQuantity;
  vm.decreaseQuantity = decreaseQuantity;
  vm.removeItem = Cart.removeItemByIndex;
  vm.getTotalAmount = Cart.getTotalAmount;
  vm.applyCoupon = applyCoupon;
  vm.placeOrder = placeOrder;
  // vm.showModal = showModal;
  vm.getFullAddress = getFullAddress;

  vm.objDiscount = Cart.getDiscount();

  vm.errMessage = '';

  // vm.delivery_addresses = [];
  vm.delivery_address = {};
  if ($rootScope.locality.selectedItem) {
    let locs = $rootScope.locality.selectedItem.display.split(', ');

    vm.delivery_address = {
      unitNumber: '',
      unitName: '',
      streetName: '',
      landmark: '',
      subLocality: locs[0],
      locality: locs[1],
      city: 'Mumbai',
      latitude: 0,
      longitude: 0
    };
  }

  $rootScope.$on('$destroy', $rootScope.$on('CART_UPDATED', () => {
    vm.items = Cart.getItems();
    $log.log('cart_updated', vm.items);
  }));

  // $rootScope.$on('$destroy', $rootScope.$on('DELIVERY_ADDRESS_UPDATED', (event, data) => {
  //   if (data.index == -1){
  //     vm.delivery_addresses.push(data.address);
  //   }else {
  //     vm.delivery_addresses[data.index] = data.address;
  //   }
  // }));

  vm.$onInit = function onInit() {
    vm.paymentMode = 'cash on delivery';

    init();
  }

  function init() {
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

  function increaseQuantity(index) {
    vm.items[index].quantity = Cart.addToShoppingCart(vm.items[index], 1);
    $log.log('qty', vm.items[index].quantity);
  }

  function decreaseQuantity(index) {
    vm.items[index].quantity = Cart.addToShoppingCart(vm.items[index], -1);
  }

  /*function showModal(event, index) {
    $mdDialog.show({
      controller: LocalityCtrl,
      controllerAs: '$ctrl',
      templateUrl: 'app/pages/checkout/locality/tpl.html',
      parent: $document[0].body,
      targetEvent: event,
      clickOutsideToClose: true,
      locals: {
        locality: index == -1 ? null : vm.delivery_addresses[index],
        index: index
      }
      // fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    });
  }*/

  function applyCoupon() {
    let currentUser = Auth.getCurrentUser();
    let items = Cart.getItems().map(item => {
      return {
        itemId: item.id,
        price: item.price,
        quantity: item.quantity
      };
    });

    $log.log('applying Coupon for the customer', {
      consumerId: currentUser.customerId,
      couponCode: vm.coupon,
      items: items
    });

    vm.errMessage = '';

    Coupon.applyCoupon({
      consumerId: currentUser.customerId,
      couponCode: vm.coupon,
      items: items
    }, response => {
      $log.log('coupon response', response);
      if (response && response.status === 'success') {
        if (response.data.valid) {
          Cart.setDiscount(response.data.discountAmount, response.data.discountText);
          vm.objDiscount = Cart.getDiscount();
        } else if (response.data.invalidCode === 'NOT_VALID_COUPON') {
          vm.errMessage = 'Coupon is not valid.';
        } else if (response.data.invalidCode === 'COUPON_EXPIRED') {
          vm.errMessage = 'Coupon has been expired.';
        } else if (response.data.invalidCode === 'MIN_AMOUNT_REQUIRED') {
          vm.errMessage = 'Coupon requires a certain amount of product.';
        } else if (response.data.invalidCode === 'ALREADY_USED') {
          vm.errMessage = 'Coupon has been already used.';
        }
      } else {
        vm.errMessage = 'Failed to validate the coupon.';
      }
    });
    return false;
  }

  function placeOrder() {
    let currentUser = Auth.getCurrentUser();
    let items = Cart.getItems().map(item => {
      return {
        itemId: item.id,
        price: item.price,
        quantity: item.quantity
      };
    });
    let delivery_date = $rootScope.delivery_date.selectedItem.value;
    let delivery_time = $rootScope.delivery_time.selectedItem.value;

    $log.log('placing an Order for the customer', {
      consumerId: currentUser.customerId,
      couponCode: vm.coupon,
      items: items
    });

    Cart.placeOrder({
      consumerId: currentUser.customerId,
      deliveryTime: { 'from': delivery_date + delivery_time, 'to': delivery_date + delivery_time + 3600000 },
      couponCode: vm.coupon,
      originalAmount: vm.getTotalAmount(),
      discountAmount: vm.objDiscount.discount_amount,
      deliveryAmount: 0,
      paymentAmount: vm.getTotalAmount() - vm.objDiscount.discount_amount,
      items: items,
      deliveryAddress: vm.delivery_address,
      paymentMode: vm.paymentMode
    }, error => {
      if (!error) {
        $state.go('main.confirmation')
      } else {
        vm.errMessage = 'Failed to place an order.';
      }
    });
    return false;
  }

  function getFullAddress(item) {
    return item.unitNumber + ' ' + item.unitName + ', ' + item.streetName + ', ' + item.landmark + ', ' + item.subLocality + ', ' + item.locality + ', ' + item.city;
  }
}
