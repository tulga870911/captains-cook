/** @ngInject */
export function MealService($log, $q, $resource, $window, ServerUrl) {
  let Resource = $resource(ServerUrl + '/:id', { id: '@id' }, {
    getFeaturedItems: { method: 'GET', url: ServerUrl + '/featuredItems' },
    getAvailableItems: { method: 'GET', url: ServerUrl + '/items/available?locality=:locality&subLocality=:subLocality&from=:from&to=:to' }
  });

  let categories = [];
  let items = [];

  let Meal = {
    getFeaturedItems(callback) {
      return Resource.getFeaturedItems(callback);
    },
    getAvailableItems({ locality, subLocality, from, to }, callback) {
      categories = [];
      items = [];

      return Resource.getAvailableItems({
        locality: locality,
        subLocality: subLocality,
        from: from,
        to: to
      }, function(response) {
        if (!response.error && response.data) {
          let _categories = response.data.categories;

          categories[0] = {
            name: 'All Categories',
            url: './assets/images/carousel-image-2.png',
            active: true
          };
          for (let i = 0, len = _categories.length; i < len; i++) {
            categories[i + 1] = {
              name: _categories[i],
              url: './assets/images/carousel-image-2.png'
            };
          }

          items = $window._.uniqBy(response.data.items, 'id');

          callback(null);
        } else {
          callback(response.error);
        }
      });
    },
    getCurrentCategories() {
      return categories;
    },
    getCurrentItems() {
      return items;
    }
  };

  return Meal;
}
