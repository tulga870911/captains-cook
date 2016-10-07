export const OrderPlaceCmt = {
  templateUrl: 'app/routes/checkout/order-place/tpl.html',
  controller: OrderPlaceCtrl
};

function OrderPlaceCtrl($state) {
  'ngInject';
  let vm = this;
  vm.goSearch = goSearch;

  function goSearch() {
    $state.go('main.results');
  }
  vm.$onInit = function onInit() {
    init()
  }

  function init() {

  }
}
