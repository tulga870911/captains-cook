/** @ngInject */
export function CartService($log, $q, $resource, $window, $rootScope, ServerUrl) {
  let Resource = $resource(ServerUrl + '/:id', { id: '@id' }, {
    getFeaturedItems: { method: 'GET', url: ServerUrl + '/featuredItems' },
    getAvailableItems: { method: 'GET', url: ServerUrl + '/items/available?locality=:locality&subLocality=:subLocality&from=:from&to=:to' }
  });

  let items = [];
  let total_price = 0;

  let Cart = {
    addToShoppingCart(item, qty) {
      let foundItem = $window._.find(items, {'itemId': item.id});
      
      $log.log('foundItem', foundItem);
      
      if (foundItem) {
        foundItem.quantity += qty;
      }else {
        items.push({
          itemId: item.id,
          price: item.price,
          quantity: qty
        });
      }

      total_price+= qty * item.price;

      $log.log('cart', items);
      $rootScope.$emit('CART_UPDATED');
    },
    clearShoppingCart() {
      items = [];
      $rootScope.$emit('CART_UPDATED');
    },
    getTotalPrice() {
      return total_price;
    },
    getCount() {
      return items.length;
    }
  };

  return Cart;
}
