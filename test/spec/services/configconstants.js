'use strict';

describe('Service: configConstants', function () {

  // load the service's module
  beforeEach(module('kaptainkookApp'));

  // instantiate service
  var configConstants;
  beforeEach(inject(function (_configConstants_) {
    configConstants = _configConstants_;
  }));

  it('should do something', function () {
    expect(!!configConstants).toBe(true);
  });

});
