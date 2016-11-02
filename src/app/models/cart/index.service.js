import { SignInCtrl } from '../../pages/login/signin/index';

/** @ngInject */
export function CartService($log, $q, $resource, $document, $window, $rootScope, $mdDialog, Auth, ServerUrl) {
  let Resource = $resource(ServerUrl + '/:consumerId', { consumerId: '@consumerId' }, {
    placeOrder: { method: 'POST', url: ServerUrl + '/consumers/:consumerId/placeOrder' }
  });

  $log.log(Resource);

  let items = [];
  let total_price = 0;
  let objDiscount = {
    discount_amount: 0,
    discount_text: ''
  };
  let orderIds = [];

  let Cart = {
    addToShoppingCart(item, qty) {
      if (!Auth.isLoggedIn()) {
        $mdDialog.show({
          controller: SignInCtrl,
          controllerAs: '$ctrl',
          templateUrl: 'app/pages/login/signin/tpl.html',
          parent: $document.body,
          clickOutsideToClose: false
        });
        return 0;
      } else {
        let foundItem = $window._.find(items, { 'id': item.id });
        let qty_adjuted = qty;

        $log.log('foundItem', foundItem);
        $log.log('qtyAvailable', item.qtyAvailable);

        if (qty < 0 && foundItem && foundItem.quantity + qty <= 0) {
          qty_adjuted = -foundItem.quantity;
        } else if (qty > 0 && foundItem && foundItem.quantity + qty > item.qtyAvailable) {
          qty_adjuted = item.qtyAvailable - foundItem.quantity;
        } else if (qty > 0 && !foundItem && qty > item.qtyAvailable) {
          qty_adjuted = item.qtyAvailable;
        }

        if (foundItem) {
          foundItem.quantity += qty_adjuted;
        } else {
          item.quantity = qty_adjuted;
          items.push(item);
        }

        total_price += qty_adjuted * item.price;

        $log.log('cart', items);
        $rootScope.$emit('CART_UPDATED');

        return foundItem ? foundItem.quantity : qty_adjuted;
      }
    },
    clearShoppingCart() {
      items = [];
      total_price = 0;
      objDiscount = {
        discount_amount: 0,
        discount_text: ''
      };
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
    setDiscount(amount, text) {
      objDiscount.discount_amount = amount;
      objDiscount.discount_text = text;
    },
    getDiscount() {
      return objDiscount;
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
    removeItemByIndex(index) {
      total_price -= items[index].price * items[index].quantity;
      items.splice(index, 1);
      $rootScope.$emit('CART_UPDATED');
    },
    removeItemByObject(item) {
      let foundItem = $window._.find(items, { 'id': item.id });
      if (foundItem) {
        let index = items.indexOf(foundItem);
        total_price -= items[index].price * items[index].quantity;
        items.splice(index, 1);
        $rootScope.$emit('CART_UPDATED');
      }
    },

    placeOrder({
      consumerId,
      deliveryTime,
      couponCode,
      originalAmount,
      discountAmount,
      deliveryAmount,
      paymentAmount,
      items,
      deliveryAddress,
      paymentMode
    }, callback) {
      return Resource.placeOrder({
        consumerId: consumerId,
        deliveryTime: deliveryTime,
        couponCode: couponCode,
        originalAmount: originalAmount,
        discountAmount: discountAmount,
        deliveryAmount: deliveryAmount,
        paymentAmount: paymentAmount,
        items: items,
        deliveryAddress: deliveryAddress,
        paymentMode: paymentMode
      }, function(response) {
        if (!response.error && response.data && !response.errorCode) {
          $log.log('place order response', response.data);

          orderIds = response.data.orderIds;

          callback(null);
        } else {
          callback(response.errorCode);
        }
      });
    },

    getOrderId() {
      if (orderIds && orderIds.length)
        return orderIds[0].orderNumber;
      return '';
    }
  };

  return Cart;
}
