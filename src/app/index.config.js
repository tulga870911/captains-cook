export function config($logProvider, $provide, $httpProvider, $compileProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);
  $compileProvider.debugInfoEnabled(false);
  $httpProvider.defaults.useXDomain = true;
  // $log remove
  $provide.decorator('$log', ['$delegate',
    function($delegate) {
      let $log, enabled = true;
      $log = {
        debugEnabled: function(flag) {
          enabled = !!flag;
        }
      };
      // methods implemented by Angular's $log service
      ['log', 'warn', 'info', 'error', 'debug'].forEach(function(methodName) {
        $log[methodName] = function() {
          if (!enabled) return;
          let logger = $delegate;
          logger[methodName].apply(logger, arguments);
        }
      });
      return $log;
    }
  ])
}
