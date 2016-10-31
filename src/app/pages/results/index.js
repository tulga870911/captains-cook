import { ResultsFilterCtrl } from "./filter/index";

const ResultsCmt = {
  templateUrl: 'app/pages/results/tpl.html',
  controller: ResultsCtrl
}
export default angular.module('captainscook.pages.results', [])
  .component('results', ResultsCmt);

function ResultsCtrl($log, $state, $timeout, $scope, $rootScope, $mdDialog, $document, Meal, Cart) {
  'ngInject';
  let vm = this;
  vm.$onInit = function onInit() {
    init();
  }
  vm.goToDetailsPage = goToDetailsPage;
  vm.selectCategory = selectCategory;
  vm.isCategorySelected = isCategorySelected;
  vm.showFilter = showFilter;
  vm.addToCart = Cart.addToShoppingCart;
  vm.getCurrentQty = Cart.getCurrentQty;

  vm.decreaseQuantity = decreaseQuantity;
  vm.increaseQuantity = increaseQuantity;

  vm.categories = Meal.getCurrentCategories();
  vm.meals = Meal.getCurrentItems();

  vm.setActiveSort = setActiveSort;

  vm.showCarousel = true;

  $scope.$on('SEARCH_RESULT_UPDATED', function() {
    vm.showCarousel = false;
    vm.categories = Meal.getCurrentCategories();
    vm.meals = Meal.getCurrentItems();

    $timeout(() => {
      vm.showCarousel = true;
    }, 500);

    $log.log('categories', vm.categories);
    $log.log('meals', vm.meals);
  });

  function showFilter() {
    $mdDialog.show({
      controller: ResultsFilterCtrl,
      controllerAs: '$ctrl',
      templateUrl: 'app/pages/results/filter/tpl.html',
      parent: $document.body,
      clickOutsideToClose: false
    })
  }

  function selectCategory(index) {
    Meal.selectCategory(index);
    vm.meals = Meal.getCurrentItems();
  }

  function isCategorySelected(index) {
    return index === Meal.getSelectedCategoryIndex();
  }

  function goToDetailsPage(index) {
    Meal.selectItem(index);
    $state.go('main.details');
  }

  function changeState() {
    let oldHeight = angular.element('.carousel_wrap').height();
    angular.element('.carousel_wrap').height(oldHeight);
    angular.element('.carousel_wrap').css('opacity', '0');
    vm.showCarousel = false;
    $scope.$apply();
    $timeout(function() {
      angular.element('.carousel_wrap').css('height', 'auto');
      vm.showCarousel = true;
      $timeout(function() {
        angular.element('.carousel_wrap').css('opacity', '1');
      }, 500)
    }, 10);
  }

  function increaseQuantity(item) {
    Cart.addToShoppingCart(item, 1);
  }
  function decreaseQuantity(item) {
    Cart.addToShoppingCart(item, -1);
  }

  function changeWindow() {
    let width = angular.element(window).width();
    if (width < 960 && width > 600) {
      vm.numberOfCarousel = 4;
      changeState();
    }
    if (width < 600) {
      vm.numberOfCarousel = 2;
      changeState();
    }
    if (width > 960) {
      vm.numberOfCarousel = 6;
      changeState();
    }
  }

  function init() {
    vm.sortBy = Meal.getSorts();

    angular.element(window).resize(changeWindow);
    vm.sort = Meal.getActiveSort();
    vm.numberOfCarousel = 6;
    vm.max = 5;
    vm.rate = 4;
    vm.slickConfig = {
      enabled: true,
      autoplay: true,
      draggable: true,
      autoplaySpeed: 3000,
      method: {},
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    };
    $timeout(function() {
      changeWindow();
    }, 500)
  }

  function setActiveSort(v) {
    Meal.setActiveSort(v);

    $rootScope.$broadcast('SEARCH_RESULT_UPDATED');
  }
}
