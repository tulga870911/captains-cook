export function trusted($sce) {
  'ngInject';
  return function(html) {
    return $sce.trustAsHtml(html)
  }
}
