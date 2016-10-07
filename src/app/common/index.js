import { trusted } from "./trust.filter";

export default angular.module('captainscook.common', [])
  .filter('trusted', trusted);
