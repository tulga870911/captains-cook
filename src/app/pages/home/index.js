import { DialogCtrl } from './dialog';

const HomeCmt = {
  templateUrl: 'app/pages/home/index.tpl.html',
  controller: HomeCtrl
}

export default angular.module('captainscook.pages.home', [])
  .component('home', HomeCmt);

function HomeCtrl($log, $rootScope, $state, $mdDialog, $document) {
  'ngInject';
  let vm = this;
  vm.meals = [{ name: "Special Beef Recipe", rating: 4.5, location: "West Bengal", chef: "Sanjay Puruthi", price: "$55", oldPrice: "$60" },
    { name: "Chicken Karhai", rating: 4.1, location: "Andheri East", chef: "Sheetal Magon", price: "$30", oldPrice: "$90" },
    { name: "Bihari Biryani", rating: 5, location: "Mumbai", chef: "Ronald Weston", price: "$55", oldPrice: "$75" }

  ];
  vm.chefs = [
    { name: "RK", rating: 4.5, location: "Andheri East" },
    { name: "Sheetal Magon", rating: 5, location: "Bangalore" },
    { name: "Shipra Singh", rating: 4, location: "Andheri West" },
    { name: "Parveen Sultana", rating: 3.5, location: "Andheri East" }
  ];
  vm.goResult = goResult;
  vm.$onInit = function onInit() {
    if (!$rootScope.hasShownLanding) {
      $rootScope.hasShownLanding = true;
      
      $mdDialog.show({
        controller: DialogCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'app/pages/home/dialog.tpl.html',
        parent: $document.body,
        clickOutsideToClose: false
      });
    }
  }

  function goResult() {
    $state.go('main.results');
  }
}
