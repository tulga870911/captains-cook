const ListCmt = {
  templateUrl: 'app/routes/listing/tpl.html',
  controller: ListCtrl
};

export default angular.module('captainscook.routes.listing', [])
  .component('list', ListCmt);

function ListCtrl($state) {
  'ngInject';
  let vm = this;
  vm.goCheckOut = goCheckOut;
  vm.goResult = goResult;
  function goResult() {
    $state.go('main.results')
  }
  function goCheckOut() {
    $state.go('main.checkout');
  }
  vm.$onInit = function onInit() {
    init()
  }

  function init() {
    vm.prod = { imagePaths: [] };
    vm.prod.imagePaths = [
      { custom: 'assets/images/carousel-image-2.png', thumbnail: 'assets/images/carousel-image-2.png' },
      { custom: 'assets/images/carousel-image-2.png', thumbnail: 'assets/images/carousel-image-2.png' },
      { custom: 'assets/images/carousel-image-2.png', thumbnail: 'assets/images/carousel-image-2.png' },
      { custom: 'assets/images/carousel-image-2.png', thumbnail: 'assets/images/carousel-image-2.png' },
      { custom: 'assets/images/carousel-image-2.png', thumbnail: 'assets/images/carousel-image-2.png' },
      { custom: 'assets/images/carousel-image-2.png', thumbnail: 'assets/images/carousel-image-2.png' },
      { custom: 'assets/images/carousel-image-2.png', thumbnail: 'assets/images/carousel-image-2.png' },
      { custom: 'assets/images/carousel-image-2.png', thumbnail: 'assets/images/carousel-image-2.png' },
      { custom: 'assets/images/carousel-image-2.png', thumbnail: 'assets/images/carousel-image-2.png' },
      { custom: 'assets/images/carousel-image-2.png', thumbnail: 'assets/images/carousel-image-2.png' },
      { custom: 'assets/images/carousel-image-2.png', thumbnail: 'assets/images/carousel-image-2.png' },
      { custom: 'assets/images/carousel-image-2.png', thumbnail: 'assets/images/carousel-image-2.png' }
    ];
    vm.rate = 4;
    vm.max = 5;
    vm.isReadonly = false;
  }
}
