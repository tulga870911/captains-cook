/** @ngInject */
export function MainCtrl($log, $rootScope, $timeout, Locality) {
  let vm = this;

  $rootScope.locality = {
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
      let results = query ? $rootScope.locality.items.filter(createFilterFor(query)) : $rootScope.locality.items;
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
    loadLocalities();
  };

  function loadLocalities() {
    Locality.getLocalities(function(response) {
      if (response && response.data && response.data.subLocs) {
        let localities = response.data.subLocs.map(item => {
          return item.loc;
        }).filter((elem, pos, arr) => {
          return pos == arr.indexOf(elem);
        });

        $rootScope.locality.items = localities.map(function(locality) {
          return {
            value: locality.toLowerCase(),
            display: locality
          };
        });

        $rootScope.$emit('LOCALITY_UPDATED');
      }
    });
  }

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
