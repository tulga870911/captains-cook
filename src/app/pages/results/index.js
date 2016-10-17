import { ResultsFilterCtrl } from "./filter/index";

const ResultsCmt = {
  templateUrl: './app/pages/results/tpl.html',
  controller: ResultsCtrl
}
export default angular.module('captainscook.pages.results', [])
  .component('results', ResultsCmt);

function ResultsCtrl($log, $state, $timeout, $scope, $rootScope, $mdDialog, $document, Meal) {
  'ngInject';
  let vm = this;
  vm.$onInit = function onInit() {
    init();
  }
  vm.goList = goList;
  vm.selectCategory = selectCategory;
  vm.showFilter = showFilter;
  vm.categories = Meal.getCurrentCategories();
  vm.meals = Meal.getCurrentItems();

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
    angular.forEach(vm.categories, function(value) {
      value.active = false;
    })
    vm.categories[index].active = true;
  }

  function goList() {
    $state.go('main.list');
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
    vm.sortBy = ['opt1', 'opt2', 'opt3', 'opt4'];
    
    angular.element(window).resize(changeWindow);
    vm.sort = vm.sortBy[0];
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
}
