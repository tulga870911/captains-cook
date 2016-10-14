export function DialogCtrl($log, $mdDialog) {
  'ngInject';
  let vm = this;
  vm.closeDlg = closeDlg;

  function closeDlg() {
    $mdDialog.cancel();
  }
}
