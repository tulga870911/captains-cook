/** @ngInject */
export function MealService($log, $q, $resource, $window, ServerUrl) {
  let Resource = $resource(ServerUrl + '/:id', { id: '@id' }, {
    getFeaturedItems: { method: 'GET', url: ServerUrl + '/featuredItems' },
    getAvailableItems: { method: 'GET', url: ServerUrl + '/items/available?locality=:locality&subLocality=:subLocality&from=:from&to=:to' }
  });

  let categories = [];
  let items = [];
  let nSelectedCategory = 0;
  let nSelectedItem = 0;
  let sorts = ['Rating', 'Price'];
  let active_sort = sorts[0];
  let regions = [{
    name: 'Punjabi',
    id: 1,
    active: true
  }, {
    name: 'Rajasthani',
    id: 2,
    active: true
  }, {
    name: 'Gujarati',
    id: 3,
    active: true
  }, {
    name: 'Maharashtrian',
    id: 4,
    active: true
  }, {
    name: 'Mughlai',
    id: 5,
    active: true
  }, {
    name: 'Continental',
    id: 6,
    active: true
  }, {
    name: 'Fusion',
    id: 7,
    active: true
  }, {
    name: 'North Indian',
    id: 8,
    active: true
  }, {
    name: 'South Indian',
    id: 9,
    active: true
  }, {
    name: 'Indian',
    id: 10,
    active: true
  }];
  let types = [{
    name: 'All',
    id: 1,
    active: true
  }, {
    name: 'Vegan',
    id: 2
  }, {
    name: 'Non-Vegan',
    id: 3
  }];

  let Meal = {
    getSorts() {
      return sorts;
    },
    getActiveSort() {
      return active_sort;
    },
    setActiveSort(v) {
      active_sort = v;
    },
    getFoodRegions() {
      return regions;
    },
    getFoodTypes() {
      return types;
    },
    setFoodRegions(v) {
      regions = v;
    },
    setFoodTypes(v) {
      types = v;
    },
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
            url: './assets/images/carousel-image-2.png'
          };
          nSelectedCategory = 0;
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
      return $window._.filter(items, (item) => {
        if (nSelectedCategory && item.category != categories[nSelectedCategory].name)
          return false;
        if ((types[1].active && item.nonVeg) || (types[2].active && !item.nonVeg))
          return false;
        for (let i = 0; i < regions.length; i++) {
          if (regions[i].active && item.cuisine == regions[i].name)
            return true;
        }
      }).sort((a, b) => {
        if (active_sort === 'Rating') {
          if (a.rating > b.rating) return -1;
          else if (a.rating < b.rating) return 1;
          return 0;
        } else if (active_sort === 'Price') {
          if (a.price < b.price) return -1;
          else if (a.price > b.price) return 1;
          return 0;
        }
      });
    },
    getSelectedCategoryIndex() {
      return nSelectedCategory;
    },
    getSelectedItemIndex() {
      return nSelectedItem;
    },
    selectCategory(index) {
      nSelectedCategory = index;
      // angular.forEach(categories, function(value) {
      //   value.active = false;
      // });
      // categories[index].active = true;
    },
    selectItem(index) {
      nSelectedItem = index;
    }
  };

  return Meal;
}
