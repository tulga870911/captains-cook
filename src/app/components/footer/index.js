function FooterController($state) {
  'ngInject';
  const vm = this;
  vm.about = about;
  vm.customer = customer;
  vm.places = places;
  vm.join = join;
  vm.privacy = privacy;
  vm.terms = terms;
  vm.quality = quality;
  vm.faq = faq;

  function about() {
    $state.go('main.about-us');
  }

  function customer() {
    $state.go('main.customer-support');
  }

  function places() {
    $state.go('main.places-serve');
  }

  function join() {
    $state.go('main.join-us');
  }

  function privacy() {
    $state.go('main.privacy-policy');
  }

  function terms() {
    $state.go('main.terms-condition');
  }

  function quality() {
    $state.go('main.quality-control');
  }

  function faq() {
    $state.go('main.faq');
  }
}

export const Footer = {
  templateUrl: 'app/components/footer/tpl.html',
  controller: FooterController
};
