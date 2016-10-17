import { DialogCtrl } from './dialog';

const HomeCmt = {
  templateUrl: 'app/pages/home/index.tpl.html',
  controller: HomeCtrl
}

export default angular.module('captainscook.pages.home', [])
  .component('home', HomeCmt);

function HomeCtrl($log, $rootScope, $state, $mdDialog, $document, Chef, Meal) {
  'ngInject';
  let vm = this;
  vm.meals = [];
  vm.chefs = [];
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

  Chef.getFeaturedChefs(function(response){
    vm.chefs = response.data;
  });

  Meal.getFeaturedMeals(function(response){
    vm.meals = response.data;
    $log.log('Meals', vm.meals);
  });

  function goResult() {
    $state.go('main.results');
  }
}
