export const SearchCmt = {
  templateUrl: 'app/components/search/tpl.html',
  controller: SearchCtrl
}

function SearchCtrl($log, $q, $timeout, $state, $rootScope) {
  'ngInject';

  const vm = this;

  vm.locality = {
    isDisabled: false,
    noCache: false,
    selectedItem: null,
    searchText: '',
    items: [],
    onSelectItemChange: item => {
      $log.info('Locality Item changed to ' + item);
    },
    onSearchTextChange: text => {
      $log.info('Locality Text changed to ' + text);
    },
    querySearch: query => {
      let results = query ? vm.locality.items.filter(createFilterFor(query)) : vm.locality.items;
      let deferred;
      if (vm.simulateQuery) {
        deferred = $q.defer();
        $timeout(function() { deferred.resolve(results); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
  };

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

  $rootScope.$on('$destroy', $rootScope.$on('LOCALITY_LOADED', function(event, data){
    vm.locality.items = data.map(function(locality) {
      return {
        value: locality.toLowerCase(),
        display: locality
      };
    });
  }));

  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(item) {
      return (item.value.indexOf(lowercaseQuery) === 0);
    };

  }
}
