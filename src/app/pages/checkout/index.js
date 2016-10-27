import { OrderPlaceCmt } from './order-place/index';
import { addModalCtrl } from './add-modal/index';

const CheckOutCmt = {
  templateUrl: 'app/pages/checkout/tpl.html',
  controller: CheckOutCtrl
};

export default angular.module('captainscook.pages.checkout', [])
  .component('checkout', CheckOutCmt)
  .component('orderPlace', OrderPlaceCmt);

function CheckOutCtrl($log, $state, $rootScope, Cart, Coupon, Auth, $mdDialog, $document) {
  'ngInject';

  let vm = this;

  vm.items = Cart.getItems();

  vm.increaseQuantity = Cart.increaseQuantity;
  vm.decreaseQuantity = Cart.decreaseQuantity;
  vm.removeItem = Cart.removeItem;
  vm.getTotalAmount = Cart.getTotalAmount;
  vm.applyCoupon = applyCoupon;
  vm.placeOrder = placeOrder;
  vm.showModal = showModal;

  vm.objDiscount = Cart.getDiscount();

  vm.errMessage = '';

  $rootScope.$on('$destroy', $rootScope.$on('CART_UPDATED', function () {
    vm.items = Cart.getItems();
    $log.log('cart_updated', vm.items);
  }));

  vm.$onInit = function onInit() {
    vm.paymentRadio = `Banana`;
    vm.modal = {
      unit: 'this is unit'
    };
    init();
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

  function showModal(event) {
    $mdDialog.show({
      controller: addModalCtrl,
      controllerAs: '$ctrl',
      templateUrl: 'app/pages/checkout/add-modal/tpl.html',
      parent: $document[0].body,
      targetEvent: event,
      clickOutsideToClose: true
        // fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
  }

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
      deliveryAddress: {
        "unitNumber": "J - 201",
        "unitName": "Lok Darshan",
        "streetName": "xxxx",
        "landmark": "ddd",
        "locality": "Andheri East",
        "subLocality": "Marol",
        "city": "Mumbai",
        "latitude": 33.44,
        "longitude": 76.33
      },
      paymentMode: 'cash on delivery'
    }, error => {
      if (!error) {
        $state.go('main.orderplace')
      } else {
        vm.errMessage = 'Failed to place an order.';
      }
    });
    return false;
  }
}
