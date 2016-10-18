export const SearchCmt = {
  templateUrl: 'app/components/search/tpl.html',
  controller: SearchCtrl
}

function SearchCtrl($log, $q, $timeout, $state, $rootScope) {
  'ngInject';

  const vm = this;

  vm.locality = $rootScope.locality;
  vm.showSearchResults = showSearchResults;

  vm.$onInit = function onInit() {
    init();
  }

  $rootScope.$on('$destroy', $rootScope.$on('LOCALITY_UPDATED', function () {
    vm.locality = $rootScope.locality;
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
    $rootScope.$emit('SHOW_SEARCH_RESULTS');

    $state.go('main.results');
  }

  // second selector

  vm.simulateQuery = false;
  vm.isDisabled = false;

  vm.repos = loadAll();
  vm.querySearch = querySearch;
  vm.selectedItemChange = selectedItemChange;
  vm.searchTextChange = searchTextChange;

  function querySearch(query) {
    var results = query ? vm.repos.filter(createFilterFor(query)) : vm.repos,
      deferred;
    if (vm.simulateQuery) {
      deferred = $q.defer();
      $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
      return deferred.promise;
    } else {
      return results;
    }
  }

  function searchTextChange(text) {
    $log.info('Text changed to ' + text);
  }

  function selectedItemChange(item) {
    $log.info('Item changed to ' + JSON.stringify(item));
  }

  function loadAll() {
    var repos = [{
      'name': '111',
      'url': '111',
      'watchers': '11',
      'forks': '11',
    }, {
      'name': '11',
      'url': '11',
      'watchers': '469',
      'forks': '760',
    }];
    return repos.map(function (repo) {
      repo.value = repo.name.toLowerCase();
      return repo;
    });
  }

  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(item) {
      return (item.value.indexOf(lowercaseQuery) === 0);
    };

  }
}
