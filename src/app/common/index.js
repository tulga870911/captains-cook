import { trusted } from "./trust.filter";
import { ServerUrl } from "./server.constant";

export default angular.module('captainscook.common', [])
  .filter('trusted', trusted)
  .constant('ServerUrl', ServerUrl);
