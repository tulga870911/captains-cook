/** @ngInject */
export function CartService($log, $q, $resource, $window, $rootScope, ServerUrl) {
  let Resource = $resource(ServerUrl + '/:id', { id: '@id' }, {
    getAvailableItems: { method: 'GET', url: ServerUrl + '/items/available?locality=:locality&subLocality=:subLocality&from=:from&to=:to' }
  });

  let items = [];
  let total_price = 0;

  let Cart = {
    addToShoppingCart(item, qty) {
      let foundItem = $window._.find(items, { 'id': item.id });

      $log.log('foundItem', foundItem);

      if (foundItem) {
        foundItem.quantity += qty;
      } else {
        item.quantity = qty;
        items.push(item);
      }

      total_price += qty * item.price;

      $log.log('cart', items);
      $rootScope.$emit('CART_UPDATED');
    },
    clearShoppingCart() {
      items = [];
      $rootScope.$emit('CART_UPDATED');
    },
    getTotalAmount() {
      return total_price;
    },
    getCount() {
      return items.length;
    },
    getItems() {
      return items;
    },
    increaseQuantity(index) {
      items[index].quantity++;
      total_price += items[index].price;
      $rootScope.$emit('CART_UPDATED');
    },
    getCurrentQty(item) {
      if (!item || !item.id)
        return 0;

      let foundItem = $window._.find(items, { 'id': item.id });
      if (foundItem)
        return foundItem.quantity;
      else
        return 0;
    },
    decreaseQuantity(index) {
      if (items[index].quantity <= 0)
        items[index].quantity = 0;
      else {
        items[index].quantity--;
        total_price -= items[index].price;
      }
      $rootScope.$emit('CART_UPDATED');
    },

    removeItem(index) {
      total_price -= items[index].price * items[index].quantity;
      items.splice(index, 1);
      $rootScope.$emit('CART_UPDATED');
    }
  };

  return Cart;
}
