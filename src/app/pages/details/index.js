const DetailsCmt = {
  templateUrl: 'app/pages/details/tpl.html',
  controller: DetailsCtrl
};

export default angular.module('captainscook.pages.details', [])
  .component('searchDetails', DetailsCmt);

function DetailsCtrl($log, $state, Meal, Cart) {
  'ngInject';
  
  let vm = this;

  vm.goToCheckout = goToCheckout;
  vm.goToResultPage = goToResultPage;
  vm.selectItem = selectItem;
  vm.isItemSelected = isItemSelected;
  vm.onAfterChange = onAfterChange;
  vm.getSelectedItemIndex = Meal.getSelectedItemIndex();
  vm.decreaseQuantity = decreaseQuantity;
  vm.increaseQuantity = increaseQuantity;
  vm.addToCart = addToCart;
  vm.selectPreviousItem = selectPreviousItem;
  vm.selectNextItem = selectNextItem;
  
  vm.meals = Meal.getCurrentItems();
  vm.currentItem = vm.meals[Meal.getSelectedItemIndex()];

  vm.quantity = Cart.getCurrentQty(vm.currentItem);

  $log.log('currentItem', vm.currentItem);

  if (!vm.meals || !vm.meals.length || !vm.currentItem){
    goToResultPage();
  }

  function goToResultPage() {
    $state.go('main.results')
  }
  function goToCheckout() {
    $state.go('main.checkout');
  }
  function selectItem(index) {
    Meal.selectItem(index);
  }
  function isItemSelected(index) {
    return index === Meal.getSelectedItemIndex();
  }
  function onAfterChange(slider) {
    let elem = slider.element;
    
    Meal.selectItem(elem.currentSlide);

    vm.currentItem = vm.meals[Meal.getSelectedItemIndex()];
    vm.quantity = Cart.getCurrentQty(vm.currentItem);
  }
  function increaseQuantity(item) {
    vm.quantity = Cart.addToShoppingCart(item, 1);
  }
  function decreaseQuantity(item) {
    vm.quantity = Cart.addToShoppingCart(item, -1);
  }
  function addToCart(item) {
    vm.quantity = Cart.addToShoppingCart(item, 1);
  }
  function selectPreviousItem() {
    angular.element('#slider a.flex-prev').click();
  }
  function selectNextItem() {
    angular.element('#slider a.flex-next').click();
  }

  vm.$onInit = function onInit() {
    init();
  };

  function init() {
    vm.rate = 4;
    vm.max = 5;
    vm.isReadonly = false;
  }
}
