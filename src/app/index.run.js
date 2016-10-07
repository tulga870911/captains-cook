export function runBlock($log) {
  'ngInject';

  function init() {
    // switch $log
    $log.debugEnabled(true);
    toTop();
  }
  init();
  $log.debug('runBlock end');

  function toTop() {
    angular.element(window).scroll(function() {
      if (angular.element(this).scrollTop() > 100) {
        angular.element('.to_top').fadeIn();
      } else {
        angular.element('.to_top').fadeOut();
      }
    });

    angular.element('.to_top').click(function() {
      angular.element("html, body").animate({
        scrollTop: 0
      }, 500);
      return false;
    });
  }
}
