export function DialogCtrl($log, $mdDialog) {
  'ngInject';
  $log.debug('landing ctrl');
  let vm = this;
  vm.toSite = toSite;

  function toSite() {
    $mdDialog.cancel();
  }
}
