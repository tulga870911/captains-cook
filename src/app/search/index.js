export const SearchCmt = {
  templateUrl: 'app/search/tpl.html',
  controller: SearchCtrl
}

function SearchCtrl($log, $state) {
  'ngInject';
  $log.log('search')
  let vm = this;
  vm.$onInit = function onInit() {
    init()
  }

  function init() {
    let stateName = $state.current.name;
    $log.log('search state name-->', stateName);
    if (stateName == 'main.home') {
      vm.searchBtn = `Search`;
    } else {
      vm.searchBtn = `<i class="material-icons">search</i>`;
    }
  }

}
