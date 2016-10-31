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

  $rootScope.delivery_date = {
    isDisabled: false,
    noCache: false,
    selectedItem: null,
    searchText: '',
    items: [],
    subitems: [],
    onSelectItemChange: item => {
      let index = $rootScope.delivery_date.items.indexOf(item);
      $log.info('DeliveryDate Item changed to ' + index);

      if (index < 0)
        $rootScope.delivery_time.items = [];
      else
        $rootScope.delivery_time.items = $rootScope.delivery_date.subitems[index];
      $rootScope.delivery_time.selectedItem = null;
    },
    onSearchTextChange: text => {
      $log.info('DeliveryDate Text changed to ' + text);
    },
    querySearch: query => {
      let results = query ? $rootScope.delivery_date.items.filter(createFilterFor(query)) : $rootScope.delivery_date.items;
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

  $rootScope.delivery_time = {
    isDisabled: false,
    noCache: false,
    selectedItem: null,
    searchText: '',
    items: [],
    onSelectItemChange: item => {
      $log.info('DeliveryTime Item changed to ' + item);
    },
    onSearchTextChange: text => {
      $log.info('DeliveryTime Text changed to ' + text);
    },
    querySearch: query => {
      let results = query ? $rootScope.delivery_time.items.filter(createFilterFor(query)) : $rootScope.delivery_time.items;
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

    // populateDeliveryDateTime();
  };

  $rootScope.$on('$destroy', $rootScope.$on('SHOW_SEARCH_RESULTS', () => {
    let locs = $rootScope.locality.selectedItem.display.split(', ');
    let delivery_date = $rootScope.delivery_date.selectedItem.value;
    let delivery_time = $rootScope.delivery_time.selectedItem.value;

    $log.log('trying to fetch results', {
      locality: $rootScope.locality.selectedItem.display,
      from: delivery_date + delivery_time,
      to: delivery_date + delivery_time + 3600000
    });
    Meal.getAvailableItems({locality: locs[1], subLocality: locs[0], from: delivery_date + delivery_time, to: delivery_date + delivery_time + 3600000}, function(){
      $rootScope.$broadcast('SEARCH_RESULT_UPDATED');
    });
  }));

  function loadLocalities() {
    Locality.getLocalities(function(response) {
      if (response && response.data && response.data.subLocs) {
        let localities = response.data.subLocs.map(item => {
          return item.subLoc + ', ' + item.loc;
        }).filter((elem, pos, arr) => {
          return pos == arr.indexOf(elem);
        });

        let times = response.data.times;

        $rootScope.locality.items = localities.map(locality => {
          return {
            value: locality.toLowerCase(),
            display: locality
          };
        });

        for (let i = 0, len = times.length; i < len; i++){
          let date_from = new Date(times[i].from);
          let date_to = new Date(times[i].to);
          let startOfDay = new Date(date_from.getFullYear(), date_from.getMonth(), date_from.getDate());
          let j = 0;

          $rootScope.delivery_date.items[i] = {
            value: startOfDay.getTime(),
            display: (startOfDay.getMonth() + 1) + '/' + startOfDay.getDate() + '/' + startOfDay.getFullYear()
          };

          $rootScope.delivery_date.subitems[i] = [];

          for (let timestamp = date_from.getTime(); timestamp < date_to.getTime(); timestamp+= 3600 * 1000){
            let date = new Date(timestamp);
            
            let from_hours = date.getHours(), from_mins = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
            let from_ampm = from_hours < 12 ? 'AM' : 'PM';
            let to_hours = from_hours + 1, to_mins = from_mins;
            let to_ampm = to_hours < 12 ? 'AM' : 'PM';

            from_hours = from_hours % 12;
            if (from_hours == 12) from_hours = 12;
            to_hours = to_hours % 12;
            if (to_ampm == 'PM') to_hours = 12;

            $rootScope.delivery_date.subitems[i][j++] = {
              value: timestamp - startOfDay.getTime(),
              display: from_hours + ':' + from_mins + ' ' + from_ampm + ' - ' + to_hours + ':' + to_mins + ' ' + to_ampm
            };
          }
        }
        $log.log('available items', response.data);

        $rootScope.$emit('LOCALITY_UPDATED');
      }
    });
  }

  /*function populateDeliveryDateTime() {
    let today = new Date();
    let startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let from_hours = '',
      from_ampm = '';
    let to_hours = '',
      to_ampm = '';

    for (let i = 0; i < 7; i++) {
      $rootScope.delivery_date.items[i] = {
        value: startOfDay.getTime(),
        display: (startOfDay.getMonth() + 1) + '/' + startOfDay.getDate() + '/' + startOfDay.getFullYear()
      };
      startOfDay.setDate(startOfDay.getDate() + 1);
    }

    $log.log('delivery_date', $rootScope.delivery_date);

    for (let i = 0; i < 24; i++) {
      from_ampm = i < 12 ? 'AM' : 'PM';
      from_hours = i % 12;
      if (i == 12) from_hours = 12;

      to_ampm = (i + 1) < 12 ? 'AM' : 'PM';
      to_hours = (i + 1) % 12;
      if (i + 1 == 12) to_hours = 12;

      $rootScope.delivery_time.items[i] = {
        value: i * 3600 * 1000,
        display: from_hours + ':00 ' + from_ampm + ' - ' + to_hours + ':00 ' + to_ampm
      };
    }

    $rootScope.$emit('DELIVERY_DATETIME_UPDATED');
  }*/

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
