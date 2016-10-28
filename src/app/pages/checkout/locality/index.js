export function LocalityCtrl($log) {
	'ngInject';
	$log.log('checkout locality controller');
	const vm = this;
	vm.locality = {
		unit: 'unit'
	}
}