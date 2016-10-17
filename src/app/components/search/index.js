export const SearchCmt = {
  templateUrl: 'app/components/search/tpl.html',
  controller: SearchCtrl
}

function SearchCtrl($log, $q, $timeout, $state, $rootScope) {
  'ngInject';

  const vm = this;

  vm.locality = $rootScope.locality;

  vm.$onInit = function onInit() {
    init();
  }

  function init() {
    let stateName = $state.current.name;
    if (stateName == 'main.home') {
      vm.searchBtn = `Search`;
    } else {
      vm.searchBtn = `<i class="material-icons">search</i>`;
    }
  }

  $rootScope.$on('$destroy', $rootScope.$on('LOCALITY_UPDATED', function(){
    vm.locality = $rootScope.locality;
  }));
}
