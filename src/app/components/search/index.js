export const SearchCmt = {
  templateUrl: 'app/components/search/tpl.html',
  controller: SearchCtrl
}

function SearchCtrl($log, $q, $timeout, $state, $rootScope) {
  'ngInject';

  const vm = this;

  vm.locality = $rootScope.locality;
  vm.delivery_date = $rootScope.delivery_date;
  vm.delivery_time = $rootScope.delivery_time;

  vm.showSearchResults = showSearchResults;

  vm.clearDate = clearDate;
  vm.clearTime = clearTime;

  function clearDate() {
    vm.delivery_date.searchText = '';
  }

  function clearTime() {
    vm.delivery_time.searchText = '';
  }

  vm.$onInit = function onInit() {
    init();
  }

  $rootScope.$on('$destroy', $rootScope.$on('BASEDATA_UPDATED', function() {
    vm.locality = $rootScope.locality;
    vm.delivery_date = $rootScope.delivery_date;
  }));

  function init() {
    let stateName = $state.current.name;
    if (stateName == 'main.home') {
      vm.searchBtn = `Search`;
    } else {
      vm.searchBtn = `<i class="material-icons">search</i>`;
    }
  }

  function showSearchResults() {
    // $rootScope.$emit('SHOW_SEARCH_RESULTS');

    let locs = $rootScope.locality.selectedItem.display.split(', ');
    let delivery_date = $rootScope.delivery_date.selectedItem.value;
    let delivery_time = $rootScope.delivery_time.selectedItem.value;

    $state.go('main.results', {
      locality: locs[1],
      sub_locality: locs[0],
      delivery_date: delivery_date,
      delivery_time: delivery_time
    }, { reload: true });
  }

}
