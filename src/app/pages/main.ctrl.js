/** @ngInject */
export function MainCtrl($log, $q, $rootScope, $timeout, Locality, Meal) {
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

  $rootScope.$on('$destroy', $rootScope.$on('SHOW_SEARCH_RESULTS', () => {
    $log.log('trying to fetch results', {
      locality: $rootScope.locality.selectedItem.display
    });
    Meal.getAvailableItems({locality: 'Andheri East', subLocality: 'Marol', from: 1474531200000, to: 1474534800000}, function(){
      $rootScope.$broadcast('SEARCH_RESULT_UPDATED');
    });
  }));

  function loadLocalities() {
    Locality.getLocalities(function(response) {
      if (response && response.data && response.data.subLocs) {
        let localities = response.data.subLocs.map(item => {
          return item.loc;
        }).filter((elem, pos, arr) => {
          return pos == arr.indexOf(elem);
        });

        $rootScope.locality.items = localities.map(locality => {
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
