export function ResultsFilterCtrl($log, $mdDialog) {
  'ngInject';
  let vm = this;
  vm.cancel = cancel;
  vm.save = save;
  $log.log('filter controlelr');
  init();

  function cancel() {
    $mdDialog.cancel();
  }
  function save() {
  	$mdDialog.cancel()
  }

  function init() {
    vm.types = [{
      name: 'All',
      id: 1,
      active: true
    }, {
      name: 'Vegan',
      id: 2
    }, {
      name: 'Non-Vegan',
      id: 3
    }];
    vm.regions = [{
      name: 'region1',
      id: 1
    }, {
      name: 'region1',
      id: 2
    }, {
      name: 'region1',
      id: 3
    }, {
      name: 'region1',
      id: 4
    }, {
      name: 'region1',
      id: 5
    }, {
      name: 'region1',
      id: 6
    }, {
      name: 'region1',
      id: 7
    }, {
      name: 'region1',
      id: 8
    }, {
      name: 'region1',
      id: 9
    }, {
      name: 'region1',
      id: 10
    }, {
      name: 'region1',
      id: 11
    }]
  }
}
