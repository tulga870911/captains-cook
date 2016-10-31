export function ResultsFilterCtrl($log, $rootScope, $mdDialog, Meal) {
  'ngInject';
  let vm = this;

  vm.cancel = cancel;
  vm.save = save;
  vm.selectFoodType = selectFoodType;
  vm.onRegionAllUpdated = onRegionAllUpdated;
  vm.onRegionUpdated = onRegionUpdated;

  init();

  function cancel() {
    $mdDialog.cancel();
  }

  function save() {
    Meal.setFoodRegions(vm.regions);
    Meal.setFoodTypes(vm.types);

    $rootScope.$broadcast('SEARCH_RESULT_UPDATED');

    $mdDialog.cancel()
  }

  function selectFoodType(index) {
    if (vm.types[index].active) return;

    vm.types[index].active = true;
    for (let i = 0; i < vm.types.length; i++) {
      if (i != index) vm.types[i].active = false;
    }
  }

  function init() {
    vm.types = Meal.getFoodTypes();

    vm.regions = Meal.getFoodRegions();

    vm.regionAll = true;
    for (let i = 0; i < vm.regions.length; i++) {
      if (!vm.regions[i].active) {
        vm.regionAll = false;
        break;
      }
    }
  }

  function onRegionAllUpdated() {
    for (let i = 0; i < vm.regions.length; i++) {
      vm.regions[i].active = vm.regionAll;
    }
  }

  function onRegionUpdated() {
    vm.regionAll = true;
    for (let i = 0; i < vm.regions.length; i++) {
      if (!vm.regions[i].active) {
        vm.regionAll = false;
        break;
      }
    }
  }
}
