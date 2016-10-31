export function LocalityCtrl($log, $scope, $rootScope, $mdDialog, locality, index, google) {
  'ngInject';
  $log.log('checkout locality controller');
  let vm = this;

  vm.updateLocality = updateLocality;
  if (!locality) {
    let locs = $rootScope.locality.selectedItem.display.split(', ');

    vm.locality = {
      unitNumber: '',
      unitName: '',
      streetName: '',
      landmark: '',
      subLocality: locs[0],
      locality: locs[1],
      city: 'Mumbai',
      latitude: 0,
      longitude: 0
    };
  } else {
    vm.locality = locality;
  }

  function updateLocality() {
    let geocoder = new google.maps.Geocoder();
    let address = vm.locality.unitNumber + ' ' + vm.locality.unitName + ', ' + vm.locality.streetName + ', ' + vm.locality.landmark + ', ' + vm.locality.subLocality + ', ' + vm.locality.locality + ', ' + vm.locality.city;

    geocoder.geocode({ 'address': address }, (results, status) => {

      if (status == google.maps.GeocoderStatus.OK) {
        $log.info('results', results);

        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
        
        vm.locality.latitude = latitude;
        vm.locality.longitude = longitude;

        $rootScope.$emit('DELIVERY_ADDRESS_UPDATED', {
          index: index,
          address: vm.locality
        });

        $mdDialog.cancel();
      }

    });
    return false;
  }
}
