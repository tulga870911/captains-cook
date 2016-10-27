export function addModalCtrl($log) {
	'ngInject';
	$log.log('checkout add modal controller');
	const vm = this;
	vm.modal = {
		unit: 'unit'
	}
}