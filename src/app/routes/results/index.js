import { ResultsFilterCtrl } from "./filter/index";

const ResultsCmt = {
  templateUrl: './app/routes/results/tpl.html',
  controller: ResultsCtrl
}
export default angular.module('captainscook.routes.results', [])
  .component('results', ResultsCmt);

function ResultsCtrl($log, $state, $timeout, $scope, $mdDialog, $document) {
  'ngInject';
  let vm = this;
  vm.$onInit = function onInit() {
    init();
  }
  vm.goList = goList;
  vm.selFilter = selFilter;
  vm.showFilter = showFilter
  vm.showCarousel = true;

  function showFilter() {
    $mdDialog.show({
      controller: ResultsFilterCtrl,
      controllerAs: '$ctrl',
      templateUrl: 'app/routes/results/filter/tpl.html',
      parent: $document.body,
      clickOutsideToClose: false
    })
  }

  function selFilter(index) {
    angular.forEach(vm.filters, function(value) {
      value.active = false;
    })
    vm.filters[index].active = true;
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
    $log.log('result controller');
    vm.filters = [{
      url: `./assets/images/carousel-image-2.png`,
      name: `Name`
    }, {
      url: `./assets/images/carousel-image-2.png`,
      name: `Name`
    }, {
      url: `./assets/images/carousel-image-2.png`,
      name: `Name`
    }, {
      url: `./assets/images/carousel-image-2.png`,
      name: `Name`
    }, {
      url: `./assets/images/carousel-image-2.png`,
      name: `Name`
    }, {
      url: `./assets/images/carousel-image-2.png`,
      name: `Name`
    }, {
      url: `./assets/images/carousel-image-2.png`,
      name: `Name`
    }, {
      url: `./assets/images/carousel-image-2.png`,
      name: `Name`
    }, {
      url: `./assets/images/carousel-image-2.png`,
      name: `Name`
    }];
    vm.filters[0].active = true;
    vm.sortBy = ['opt1', 'opt2', 'opt3', 'opt4'];
    vm.meals = [{ name: "Special Beef Recipe", rating: 4.5, location: "West Bengal", chef: "Sanjay Puruthi", price: "$55", oldPrice: "$60", id: 1 },
      { name: "Chicken Karhai", rating: 4.1, location: "Andheri East", chef: "Sheetal Magon", price: "$30", oldPrice: "$90", id: 2 },
      { name: "Bihari Biryani", rating: 5, location: "Mumbai", chef: "Ronald Weston", price: "$55", oldPrice: "$75", id: 3 },
      { name: "Bihari Biryani", rating: 5, location: "Mumbai", chef: "Ronald Weston", price: "$55", oldPrice: "$75", id: 4 },
      { name: "Bihari Biryani", rating: 5, location: "Mumbai", chef: "Ronald Weston", price: "$55", oldPrice: "$75", id: 5 },
      { name: "Bihari Biryani", rating: 5, location: "Mumbai", chef: "Ronald Weston", price: "$55", oldPrice: "$75", id: 6 },
      { name: "Bihari Biryani", rating: 5, location: "Mumbai", chef: "Ronald Weston", price: "$55", oldPrice: "$75", id: 7 },
      { name: "Bihari Biryani", rating: 5, location: "Mumbai", chef: "Ronald Weston", price: "$55", oldPrice: "$75", id: 8 },
      { name: "Bihari Biryani", rating: 5, location: "Mumbai", chef: "Ronald Weston", price: "$55", oldPrice: "$75", id: 9 }
    ];
    angular.element(window).resize(changeWindow);
    vm.sort = vm.sortBy[0];
    vm.numberOfCarousel = 6;
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
