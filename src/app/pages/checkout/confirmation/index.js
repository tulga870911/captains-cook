export const ConfirmationCmt = {
  templateUrl: 'app/pages/checkout/confirmation/tpl.html',
  controller: ConfirmationCtrl
};

function ConfirmationCtrl($state, Cart) {
  'ngInject';
  let vm = this;

  vm.goToSearch = goToSearch;

  function goToSearch() {
    Cart.clearShoppingCart();
    $state.go('main.results');
  }
  vm.$onInit = function onInit() {
    init()
  }

  function init() {
    vm.orderId = Cart.getOrderId();
    vm.total_amount = Cart.getTotalAmount() - Cart.getDiscount().discount_amount;

    if (!vm.orderId)
      goToSearch();
  }
}
