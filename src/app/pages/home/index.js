import { DialogCtrl } from './dialog';

const HomeCmt = {
  templateUrl: 'app/pages/home/index.tpl.html',
  controller: HomeCtrl
}

export default angular.module('captainscook.pages.home', [])
  .component('home', HomeCmt);

function HomeCtrl($log, $rootScope, $state, $mdDialog, $document, Chef, Meal, Promotion) {
  'ngInject';
  let vm = this;
  vm.meals = [];
  vm.chefs = [];
  vm.promotions = [];
  vm.showAllDeals = showAllDeals;

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

  Chef.getFeaturedChefs(function(response){
    vm.chefs = response.data;
  });

  Meal.getFeaturedMeals(function(response){
    vm.meals = response.data;
  });

  Promotion.getPromotions(function(response){
    vm.promotions = response.data;
    $log.log('promotions', vm.promotions);
  });

  function showAllDeals() {
    //$state.go('main.results');
  }
}
